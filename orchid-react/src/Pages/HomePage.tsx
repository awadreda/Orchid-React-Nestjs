import { NavLink } from 'react-router'

interface HomePageProps {}

export default function HomePage () {
  return (
    <>
      <div>Welcome to the Home Page</div>

      <NavLink to='/stories'>Go to Stories</NavLink>
      <br />
      <NavLink to='/addnewstory'>Add New Story</NavLink>
      <br />
    </>
  )
}
