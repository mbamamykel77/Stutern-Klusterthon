// import Produce from "../models/produce.model.js"

// const ensureOwnership = async (req, res, next) => {
//   const { produceId } = req.params;

//   try {
//     const produce = await Produce.findById(produceId);

//     // Check ownership
//     if (!produce || produce.farmer.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         status: "failed",
//         message: "You do not have permission to perform this operation.",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "failed",
//       message: "Internal server error",
//     });
//   }
// };

// // Export the middleware
// export default ensureOwnership;
