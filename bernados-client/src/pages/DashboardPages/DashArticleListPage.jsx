import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Modal, TextField, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { fetchArticles, createArticle, updateArticle } from '../../services/articleService';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 750, bgcolor: 'background.paper', border: '2px solid #80956B', boxShadow: 24, p: 4,
  maxHeight: '90vh', overflowY: 'auto',
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ slug: '', title: '', thumbnail: '', content: '', isActive: true });

  useEffect(() => { loadAllArticles(); }, []);

  const loadAllArticles = async () => {
    try {
      setLoading(true);
      const res = await fetchArticles(false);
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching admin records:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setForm({ slug: '', title: '', thumbnail: '', content: '', isActive: true });
    setIsEditing(false);
    setOpen(true);
  };

  const handleOpenEdit = (article) => {
    setForm({
      slug: article.slug,
      title: article.title,
      thumbnail: article.thumbnail || '',
      content: Array.isArray(article.content) ? article.content.join('\n\n') : article.content,
      isActive: article.isActive
    });
    setEditId(article._id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateArticle(editId, form);
      } else {
        await createArticle(form);
      }
      loadAllArticles();
      setOpen(false);
    } catch (err) { console.error("Error saving records:", err); }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateArticle(id, { isActive: !currentStatus });
      loadAllArticles();
    } catch (err) { console.error("Error toggling item status:", err); }
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.8, renderCell: (p) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{p.value}</span> },
    { field: 'slug', headerName: 'Slug', flex: 0.8 },
    { field: 'title', headerName: 'Title', flex: 1.2 },
    { field: 'paragraphs', headerName: 'Paragraphs', flex: 0.5 },
    { field: 'preview', headerName: 'Preview', flex: 1.5 },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 0.7,
      renderCell: (p) => (
        <Box sx={{ display: 'inline-block', bgcolor: p.value ? '#80956B' : '#d32f2f', color: '#fff', px: 1.5, py: 0.5, borderRadius: 5, fontSize: '11px', fontWeight: 'bold' }}>
          {p.value ? 'Active' : 'Disable'}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (p) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Button size="small" variant="contained" sx={{ bgcolor: '#80956B', '&:hover': { bgcolor: '#90A87F' } }} onClick={() => handleOpenEdit(p.row)}>Edit</Button>
          <Switch checked={p.row.isActive} onChange={() => handleToggleStatus(p.row._id, p.row.isActive)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#80956B' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#80956B' } }} />
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#80956B' }}>Articles Management</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpenAdd} sx={{ bgcolor: '#80956B', '&:hover': { bgcolor: '#90A87F' } }}>Add Article</Button>
      </Stack>
      <Box sx={{ height: 600, width: '100%', bgcolor: '#fff', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <DataGrid rows={articles} columns={columns} getRowId={(r) => r._id} loading={loading} disableRowSelectionOnClick />
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={3} fontWeight="bold" color="#80956B">{isEditing ? 'Modify Plant Article' : 'Compose New Plant Article'}</Typography>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={2}>
              <TextField fullWidth label="Article Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <TextField fullWidth label="URL Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </Stack>
            <TextField fullWidth label="Thumbnail Image URL" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
            <TextField fullWidth multiline rows={8} label="Article Content (Double Enter for separate paragraphs)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" sx={{ color: '#80956B', borderColor: '#80956B' }} onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" sx={{ bgcolor: '#80956B' }} onClick={handleSave}>{isEditing ? 'Update Post' : 'Publish Article'}</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;