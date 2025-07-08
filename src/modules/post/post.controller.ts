import { postModel } from "../../Models/post.model"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { catchError } from "../../middleware/catchError";





const addPost = catchError(async (req, res) => {
    if (!req.body.user.uid) {
        return res.status(404).json({ error: "user ID not detected" })
    }
    req.body.createdBy = req.body.user.uid
    const post = await postModel.create(req.body)
    res.json({ message: "success" , id:req.body.user.uid})
})
const getPostOfUser = catchError(async (req, res) => {
    const posts = await postModel.find({ createdBy: req.body.userID }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    })
    res.json(posts)
})
const getAllPosts = catchError(async (req, res) => {
    const posts = await postModel.find().populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'comments',
        populate: {
            path: 'createdBy',
        }
    }).sort({ createdAt: -1 }).limit(10)
    res.json(posts)
})
const getAllUrgentPosts = catchError(async (req, res) => {
    const posts = await postModel.find({ urgent:true }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).sort({ createdAt: -1 }).limit(10)
    res.json(posts)
})
const GetSinglePost = catchError(async (req, res, next) => {
    const post = await postModel.find({ createdBy:req.body.user.uid }).populate({
        path: 'createdBy',
        select: '-password' // Exclude the 'password' field
    }).populate({
        path: 'comments',
        populate: {
            path: 'createdBy',
        }
    }).sort({ createdAt: -1 }).limit(10)
    res.json(post)
})
const updatePost = catchError(async (req, res, next) => {
    let post = await postModel.findByIdAndUpdate(req.params.id, req.body)
    if (!post) {
        return res.status(404).json({ message: "post doesnt exist" })
    }
    res.json({ message: "post updated" })
})
const deletePost = catchError(async (req, res, next) => {
    let post = await postModel.findByIdAndDelete(req.params.id)
    if (!post) {
        return res.status(404).json({ message: "post doesnt exist" })
    }
    res.json({ message: "deleted" })

})

const updatePostCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            console.log(result);
            if (!result) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            await postModel.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url })

        });
    return res.json(req.file);
})

// const updatePostImages = catchError(async (req, res) => {
//     cloudinary.config({
//         cloud_name: 'dqijwldax',
//         api_key: '764827226872981',
//         api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
//     });
//     const imageUrls: string[] = [];
//     try {
//         // Loop through uploaded files and upload them to Cloudinary
//         for (const file of req.files) {
//             const result = await cloudinary.uploader.upload(file.path);
//             imageUrls.push(result.secure_url);
//         }

//         // All files uploaded, send response with image URLs
//         await postModel.findByIdAndUpdate(req.params.id, { images: imageUrls })
//         res.status(200).json({ imageUrls });
//     } catch (error) {
//         console.error('Error uploading files to Cloudinary:', error);
//         res.status(500).json({ message: 'Error uploading files to Cloudinary', error });
//     }
// });

const updatePostImages = catchError(async (req, res) => {
    cloudinary.config({
      cloud_name: 'name',
      api_key: 'key',
      api_secret: "secret"
    });
  
    const imageUrls: string[] = [];
  
    try {
      // Check if req.files is defined and is an array
      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          imageUrls.push(result.secure_url);
        }
      } else if (req.files && typeof req.files === 'object') {
        // If req.files is an object (like { [fieldname: string]: File[]; })
        for (const key in req.files) {
          if (Array.isArray(req.files[key])) {
            for (const file of req.files[key]) {
              const result = await cloudinary.uploader.upload(file.path);
              imageUrls.push(result.secure_url);
            }
          }
        }
      } else {
        // Handle the case where req.files is undefined or not in expected format
        return res.status(400).json({ message: 'No files to upload' });
      }
  
      // All files uploaded, send response with image URLs
      await postModel.findByIdAndUpdate(req.params.id, { images: imageUrls });
      res.status(200).json({ imageUrls });
    } catch (error) {
      console.error('Error uploading files to Cloudinary:', error);
      res.status(500).json({ message: 'Error uploading files to Cloudinary', error });
    }
  });
  

export {
    addPost,
    getPostOfUser,
    getAllPosts,
    getAllUrgentPosts,
    GetSinglePost,
    updatePost,
    deletePost,
    updatePostCover,
    updatePostImages
}