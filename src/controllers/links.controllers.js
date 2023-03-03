const pool = require('../db');

const formView = async (req, res) => {
  res.render('links/add');
};

const createLink = async (req, res) => {
  const { title, url, description } = req.body;
  await pool.query('INSERT INTO links SET ?', [
    { title, url, description, userID: req.user[0].id },
  ]);
  req.flash('success', 'Link saved successfully.');
  res.redirect('/links');
};

const showLinks = async (req, res) => {
  const result = await pool.query('SELECT * FROM links WHERE userID = ?', [
    req.user[0].id,
  ]);
  res.render('links/list', { links: result[0] });
};

const editLink = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
  res.render('links/edit', { link: result[0][0] });
};

const editedLink = async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  await pool.query('UPDATE links set ? WHERE id = ?', [
    { title, url, description },
    id,
  ]);
  req.flash('success', 'Link updated successfully.');
  res.redirect('/links');
};

const deleteLink = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE id = ?', [id]);
  req.flash('success', 'Link removed successfully.');
  res.redirect('/links');
};

module.exports = {
  formView,
  createLink,
  showLinks,
  editLink,
  editedLink,
  deleteLink,
};
