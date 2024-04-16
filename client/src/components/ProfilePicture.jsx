import React from 'react'
import { Avatar } from '@mui/material'
import { stringAvatar } from "../functions/stringAvatar";
import md5 from "md5";

function ProfilePicture(props) {
    const { user } = props
    const email_md5 = md5(user.email)
    const s = {
        ...stringAvatar(user.name).sx,
        ...props.sx
    }
    return (
        <>
            {user.profile_picture_type === "gravatar" && <Avatar {...props} src={"https://www.gravatar.com/avatar/" + email_md5} />}
            {user.profile_picture_type === "local" && <Avatar {...props} src={user.profile_picture + "?t=" + new Date().getTime()} />}
            {!user.profile_picture_type && <Avatar  {...stringAvatar(user.name) } sx={s} />}
        </>
    )
}

export default ProfilePicture