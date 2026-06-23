import { Button } from "@mui/material";
import { NavLink } from "react-router";






export default function RigsterButton() {
    return (
      <NavLink to="/register">
        <Button>تسجيل</Button>
      </NavLink>
    )
}