import mongoose from 'mongoose';

const paidCoursesSchema = new mongoose.Schema({
  email: { type: String, required: true },
  course_ids: [{ type: String, ref: 'Course', required: true }],
}, { timestamps: true });

const PaidCourses = mongoose.model('PaidCourses', paidCoursesSchema);

export default PaidCourses;
