import AppointmentModel from "../models/Appoinment.js";
import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await AppointmentModel.find({ doctor: req.body.doctor });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Appointments not found',
    });
  }
};

export const getAppointmentsByFullName = async (req, res) => {
  try {
    const fullName = req.params.fullName;

    const appointments = await AppointmentModel.find({ fullName: "Patient Name1" }).populate('user').exec();
    const sanitizedAppointments = appointments.map((appointment) => {
      const appointmentObj = appointment.toObject();
      delete appointmentObj.user.passwordHash;
      return appointmentObj;
    });
  
    //console.log(sanitizedAppointments);
    res.json(sanitizedAppointments);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Appointment not found',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Post not deleted',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Posts not found',
    });
  }
};

