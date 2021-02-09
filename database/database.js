const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stockbargainhunter');

// let repoSchema = mongoose.Schema({
//   repo_id: { type: Number, unique: true },
//   repo_name: String,
//   repo_owner_login: String,
//   repo_stargazers_count: Number
// });

// let Repo = mongoose.model('Repo', repoSchema);

// let retrieve = () => {
//   return Repo.find({}).sort('-repo_stargazers_count').limit(5).exec();
// }

module.exports = {}