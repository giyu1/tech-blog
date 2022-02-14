const router = require('express').Router();
const { Blog, Comments } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  res.render("homepage")
});

// GET one Blog
// Use the custom middleware before allowing the user to access the Blog
router.get('/Blog/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const Blog = dbBlogData.get({ plain: true });
    res.render('Blog', { Blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Comments
// Use the custom middleware before allowing the user to access the Comments
router.get('/Comments/:id', withAuth, async (req, res) => {
  try {
    const dbCommentsData = await Comments.findByPk(req.params.id);

    const Comments = dbCommentsData.get({ plain: true });

    res.render('Comments', { Comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
