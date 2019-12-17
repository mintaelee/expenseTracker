import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCategory } from '../../hooks/queries/useCategory'
import { useCategoryActions } from '../../hooks/commands/useCategoryActions'
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles({
    categoryList: {
        width: '500px',
    }
})

export default function UserCategories() {
    const classes = useStyles()
    const { user } = useAuth()
    const { userCategories } = useCategory()
    const { getUserCategories } = useCategoryActions()

    useEffect(() => {
        getUserCategories(user.id)
    }, [])

    return (
        <>
            <List dense={true} className={classes.categoryList}>
                {userCategories.map((data) => (
                    <ListItem key={data._id}>
                    <ListItemText
                        primary={data.name}
                    />
                    </ListItem>
                ))}
            </List>
        </>
    )
}
