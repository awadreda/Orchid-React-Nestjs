import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { getUsersDashboardSlice } from '@/Redux/slices/UsersSlice'
import { useTheme, useMediaQuery, Stack, Button } from '@mui/material'
import UserCard from '@/Components/Users/UserCard'
import type { UserDashboardDto } from '@/types/UserTypes'

import { FaInfoCircle } from 'react-icons/fa'
import { NavLink } from 'react-router'

interface Column {
  id: keyof UserDashboardDto | 'actions'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}
const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'storiesCount', label: 'Stories', minWidth: 80, align: 'center' },
  { id: 'commentsCount', label: 'Comments', minWidth: 100, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 120, align: 'center' }
]

const usersDashboardDemo = [
  {
    id: 1,
    email: 'ahmed.ali@example.com',
    name: 'Ahmed Ali',
    role: 'admin',
    createdAt: new Date('2023-01-15'),
    storiesCount: 24,
    commentsCount: 156
  },
  {
    id: 2,
    email: 'sara.smith@provider.net',
    name: 'Sara Smith',
    role: 'editor',
    createdAt: new Date('2023-02-10'),
    storiesCount: 45,
    commentsCount: 89
  },
  {
    id: 3,
    email: 'user34@gmail.com',
    name: 'undefined',
    role: 'user',
    createdAt: new Date('2023-03-05'),
    storiesCount: 2,
    commentsCount: 12
  },
  {
    id: 4,
    email: 'mohamed.hassan@company.com',
    name: 'Mohamed Hassan',
    role: 'moderator',
    createdAt: new Date('2023-03-20'),
    storiesCount: 0,
    commentsCount: 432
  },
  {
    id: 5,
    email: 'laila.noor@outlook.com',
    name: 'Laila Noor',
    role: 'user',
    createdAt: new Date('2023-04-12'),
    storiesCount: 8,
    commentsCount: 25
  },
  {
    id: 6,
    email: 'john.doe@test.io',
    name: 'John Doe',
    role: 'editor',
    createdAt: new Date('2023-05-01'),
    storiesCount: 112,
    commentsCount: 34
  },
  {
    id: 7,
    email: 'fatima.z@web.com',
    name: 'Fatima Zahra',
    role: 'user',
    createdAt: new Date('2023-05-18'),
    storiesCount: 1,
    commentsCount: 5
  },
  {
    id: 8,
    email: 'alex.king@domain.com',
    name: 'undefined',
    role: 'user',
    createdAt: new Date('2023-06-22'),
    storiesCount: 0,
    commentsCount: 0
  },
  {
    id: 9,
    email: 'omar.farouk@service.com',
    name: 'Omar Farouk',
    role: 'admin',
    createdAt: new Date('2023-07-04'),
    storiesCount: 15,
    commentsCount: 88
  },
  {
    id: 10,
    email: 'mira.aden@agency.org',
    name: 'Mira Aden',
    role: 'editor',
    createdAt: new Date('2023-07-30'),
    storiesCount: 67,
    commentsCount: 210
  },
  {
    id: 11,
    email: 'khalid.walid@blog.com',
    name: 'Khalid Walid',
    role: 'user',
    createdAt: new Date('2023-08-14'),
    storiesCount: 4,
    commentsCount: 19
  },
  {
    id: 12,
    email: 'hoda.m@provider.net',
    name: 'Hoda Mansour',
    role: 'moderator',
    createdAt: new Date('2023-09-02'),
    storiesCount: 0,
    commentsCount: 567
  },
  {
    id: 13,
    email: 'ryan.gos@cinema.com',
    name: 'Ryan G.',
    role: 'user',
    createdAt: new Date('2023-09-25'),
    storiesCount: 12,
    commentsCount: 3
  },
  {
    id: 14,
    email: 'amina.test@test.com',
    name: 'undefined',
    role: 'user',
    createdAt: new Date('2023-10-10'),
    storiesCount: 0,
    commentsCount: 1
  },
  {
    id: 15,
    email: 'youssef.b@startup.io',
    name: 'Youssef Bekhit',
    role: 'editor',
    createdAt: new Date('2023-11-05'),
    storiesCount: 33,
    commentsCount: 76
  },
  {
    id: 16,
    email: 'nour.eliman@faith.org',
    name: 'Nour El-Iman',
    role: 'user',
    createdAt: new Date('2023-11-20'),
    storiesCount: 7,
    commentsCount: 44
  },
  {
    id: 17,
    email: 'sam.altman@future.ai',
    name: 'Sam Altman',
    role: 'admin',
    createdAt: new Date('2023-12-01'),
    storiesCount: 102,
    commentsCount: 1200
  },
  {
    id: 18,
    email: 'zane.malik@music.com',
    name: 'Zane Malik',
    role: 'user',
    createdAt: new Date('2023-12-15'),
    storiesCount: 0,
    commentsCount: 28
  },
  {
    id: 19,
    email: 'dina.khaled@web.me',
    name: 'Dina Khaled',
    role: 'moderator',
    createdAt: new Date('2023-12-28'),
    storiesCount: 3,
    commentsCount: 890
  },
  {
    id: 20,
    email: 'guest.user@temp.com',
    name: 'Guest User',
    role: 'user',
    createdAt: new Date('2024-01-02'),
    storiesCount: 1,
    commentsCount: 2
  }
]

// export interface UserRow {
//   id: number
//   name: string
//   email: string
//   role: string
//   createdAt: string
//   storiesCount: number
//   commentsCount: number
// }

export default function UsersTable () {
  const UserState = useAppSelector(state => state.user)
  const users = UserState.usersDashboard

  const dispatch = useAppDispatch()

  // React.useEffect(() => {
  //   dispatch(getUsersDashboardSlice())
  // }, [])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [visibleCount, setVisibleCount] = React.useState(10)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // if (users === null) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {isMobile ? (
        <Stack spacing={2}>
          {usersDashboardDemo.slice(0, visibleCount).map(user => (
            <UserCard key={user.id} user={user} />
          ))}

          {visibleCount < usersDashboardDemo.length && (
            <Button onClick={() => setVisibleCount(visibleCount + 5)}>
              Load More
            </Button>
          )}
        </Stack>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {usersDashboardDemo
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(user => (
                    <TableRow hover tabIndex={-1} key={user.id}>
                      {columns.map(column => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align='center'>
                              {/* Icons هنا */}
                              <NavLink to={`/users/${user.id}`}>
                                <FaInfoCircle />
                              </NavLink>
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {String(user[column.id as keyof UserDashboardDto])}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={usersDashboardDemo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  )
}
