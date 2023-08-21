const Attraction = require('../models/attraction');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const attraction = await Attraction.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    attraction.reviews.push(review);
    await review.save();
    await attraction.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/attractions/${attraction._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Attraction.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/attractions/${id}`)
}
