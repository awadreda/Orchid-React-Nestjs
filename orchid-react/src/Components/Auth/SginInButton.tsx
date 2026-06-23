import { Button } from "@mui/material";
import { NavLink } from "react-router";





export default function SginInButton() {
    return (
      <NavLink to="/login">
        <Button>تسجيل الدخول</Button>
      </NavLink>
    )
}