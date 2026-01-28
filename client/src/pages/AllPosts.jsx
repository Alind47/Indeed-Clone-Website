import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getAllPosts } from "../services/api";
import { Box, Card, CardContent, InputBase, styled, Typography } from "@mui/material";
import ExpandableDescription from "../components/ExpandableDescription";

const SearchWrapper = styled(Box)({
    marginTop: 74,
    display: 'flex',
    justifyContent: 'center',
    '& > div':{
        width: 500,
        height: 45,
        border: '1px solid #767676',
        borderRadius: 10,
        display:'flex',
        alignItems:'center',
        marginRight: 20,
        padding: 10
    }
})

const PostWrapper = styled(Box)({
    display:'flex',
    justifyContent:'center',
    marginTop:50,
    flexWrap:'wrap',
    '& > div':{
        border:'1px solid #442d0',
        borderRadius:10,
        margin: 10,
        width:'30%',
        height:300
    }
})

const AllPosts = () => {
    
    const[posts, setPosts] = useState([]);
    const[text, setText] = useState("");

    useEffect(() => {
        const getData = async() => {
            const response = await getAllPosts();
            setPosts(response.data);
        }
        getData();
    }, [])


    return(
        <>
        <Header />
        <SearchWrapper>
            <InputBase 
               placeholder="Search by Job Title"
               onChange={(e) => setText(e.target.value)}
            />
        </SearchWrapper>
        <PostWrapper>
            {
                posts.filter(post => post.profile.toLowerCase().includes(text.toLowerCase())).map(post => (
                    <Card>
                        <CardContent>
  
                            <Typography variant="h5" style={{color: '#444444'}}><b>{post.profile}</b></Typography>
  
                            <Typography>{post.type === "Offline" ? "Remote" : "Office"}</Typography>
  
                            <Typography>Salary: {post.salary}</Typography>

                            <ExpandableDescription text={post.description} />
  
                            <Typography><b>Exeperience</b>: {post.experience}</Typography>
  
                            <Typography><b>Technology</b>: {Array.isArray(post.technology) ? post.technology.join(", ") : post.technology}</Typography>
  
                            <Typography style={{color:'#6f6f6f', marginTop: 'auto'}}>posted on: {new Date(post.createdAt).toLocaleDateString()}</Typography>
  
                        </CardContent>
                    </Card>
                ))
            }
        </PostWrapper>
        </>
    )
}

export default AllPosts;
