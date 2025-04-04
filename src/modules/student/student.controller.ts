import sendResponse from '../../app/middleware/sendResponse';
import catchAsync from '../../app/utils/catchAsync';
import { StudentServices } from './student.service';

const createStudentProfile = catchAsync(async (req, res) => {
  if (req.body._id) {
    await StudentServices.updateStudentProfileData(req.body);
  } else {
    await StudentServices.createStudentProfileIntoDB(req.body);
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Profile updated successfully',
  });
});

/**
 * get profile detail
 */
const getStudentProfileDetail = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await StudentServices.getStudentProfileFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile detail retrieved successfully!',
    data: result,
  });
});

// get booking data
const getAcceptedBookingRequest = catchAsync(async (req, res) => {
  const result = await StudentServices.getAcceptedBookingFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Accepted bookings retrieved successfully!',
    data: result,
  });
});

// make payment
const createPaymentController = catchAsync(async (req, res) => {
  const result = await StudentServices.createPaymentIntoDB(req.body, req.ip!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'payment created successfully!',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const result = await StudentServices.verifyPayment(
    req.query.order_id as string
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking request verified successfully',
    data: result,
  });
});

const getPastBookings = catchAsync(async (req, res) => {
  const result = await StudentServices.getPastBookingsFromDB(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Past bookings retrieved successfully',
    data: result,
  });
});

const getPaymentHistory = catchAsync(async (req, res) => {
  const result = await StudentServices.getPaymentHistoryFromDB(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment history retrieved successfully',
    data: result,
  });
});

const updateTutorRating = catchAsync(async (req, res) => {
  const result = await StudentServices.updateTutorRatingIntoDB(
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tutor rating updated successfully',
    data: result,
  });
});

const getProfileDetail = catchAsync(async (req, res) => {
  const { tutorId } = req.params;
  const result = await StudentServices.getTutorProfileDetailFromDB(
    tutorId,
    req.user
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tutor profile detail retrieved successfully!',
    data: result,
  });
});
const getProfileDetailTestimonial = catchAsync(async (req, res) => {
  const result = await StudentServices.getTutorProfileDetailTestimonialFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Tutors retrieved successfully!',
    data: result,
  });
});

const getBlogNews = catchAsync(async (req, res) => {
  const { value } = req.params;
  const result = await StudentServices.getBlogNewsFromExternalApi(value);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog news retrieved successfully!',
    data: result,
  });
});

export const StudentControllers = {
  createStudentProfile,
  getStudentProfileDetail,
  getAcceptedBookingRequest,
  createPaymentController,
  verifyPayment,
  getPastBookings,
  getPaymentHistory,
  updateTutorRating,
  getProfileDetail,
  getProfileDetailTestimonial,
  getBlogNews,
};
