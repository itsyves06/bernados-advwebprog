import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // --- States ---
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Enhancement 2 States: Search and Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    gender: 'all',
    status: 'all',
  });

  // --- Filter Logic ---
  const filteredUsers = users.filter((user) => {
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchStr) ||
      user.lastName.toLowerCase().includes(searchStr) ||
      user.email.toLowerCase().includes(searchStr) ||
      user.username.toLowerCase().includes(searchStr);

    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  // --- Handlers ---
  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // --- Validation Logic ---
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!nextErrors.contactNumber) {
      if (!/^\d+$/.test(form.contactNumber)) {
        nextErrors.contactNumber = 'Contact number must contain only numbers.';
      } else if (form.contactNumber.length !== 11) {
        nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
      }
    }

    if (!nextErrors.age && !/^\d+$/.test(form.age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.username) {
      if (/\s/.test(username)) {
        nextErrors.username = 'Username must not contain spaces.';
      } else if (users.some((user) => user.id !== modal.id && user.username.toLowerCase() === username.toLowerCase())) {
        nextErrors.username = 'Username already exists.';
      }
    }

    if (!nextErrors.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        nextErrors.email = 'Enter a valid email address.';
      } else if (users.some((user) => user.id !== modal.id && user.email === email)) {
        nextErrors.email = 'Email address already exists.';
      }
    }

    return nextErrors;
  };

  // --- Submit Handler ---
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const newUser = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
    };

    setUsers((prev) => {
      if (modal.id) {
        return prev.map((user) => (user.id === modal.id ? { ...user, ...newUser } : user));
      }

      const id = prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1;
      return [...prev, { ...newUser, id }];
    });

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user))
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 80 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.8 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      {/* Enhancement 2: Search and Filter UI */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          label="Search by name, email, or username"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: { md: 2 } }}
        />

        <Stack direction="row" spacing={1} sx={{ flex: { md: 3 }, width: '100%' }}>
          <TextField
            select
            label="Role"
            size="small"
            fullWidth
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <MenuItem value="all">All Roles</MenuItem>
            {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
          </TextField>

          <TextField
            select
            label="Gender"
            size="small"
            fullWidth
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <MenuItem value="all">All Genders</MenuItem>
            {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
          </TextField>

          <TextField
            select
            label="Status"
            size="small"
            fullWidth
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Stack>

      {/* Data Table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 400, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users match your search/filter criteria.
          </Alert>
        )}
      </Paper>

      {/* Add/Edit Modal */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ pa: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;