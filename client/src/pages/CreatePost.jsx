import { useState } from "react";
import Header from "../Components/Header";
import { Box, Button, TextField, Typography, styled} from '@mui/material';
import Dropdown from "../Components/Dropdown";
import { savePost } from "../services/api";
import { useNavigate } from "react-router-dom";
import { routePath } from "../routes/route";

const Component = styled(Box)({
    padding: '80px 200px',
    background: '#F5F5F5' 
})

const Container = styled(Box)({
    display: 'flex',
    background: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 70px',
    '& > p':{
        fontSize: 35,
        fontWeight: 700,
        opacity: '0.7'
    }
})

const FormWrapper = styled(Box)({

    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    padding: 20,
    background: '#FFFFFF',
    borderRadius: 20,
    '& > *':{
        marginTop: '20px !important'
    }
})

const defaultObj = {
    profile:"",
    type:"",
    description:"",
    experience:"",
    technology:[],
    salary:""
}

const options = {
    type: ["Online","Offline"],
    experience: ["0-2 Years","2-5 Years","5-8 Years","8 and more Years"],
    technology: ['Java', 'Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'JavaScript', 'Spring Boot', 'MongoDB', 'MySQL', 'React.js', 'Express.js', 'Angular.js', 'Node.js', 'Docker', 'AWS', 'Azure', 'Google Cloud', 'Terraform', 'HTML', 'CSS', 'Kotlin', 'Android Studio', 'Firebase', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    salary: ['Rs 0-300000', 'Rs200000-400000', 'Rs 300000-500000', 'Rs 400000-600000', 'Rs 500000-700000', 'Rs 600000-800000', 'Rs 800000-1000000', 'Rs 1000000-1500000', 'Rs 1500000-2000000', 'Rs 2000000 or more']
}

const CreatePost = () => {
     
    const [data, setData] = useState(defaultObj);
    
    const navigate = useNavigate();

    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3zkKYlIHjjoQrE4e-a5xiJIaK0reWlcDhewsx8rjV87d8M82";
    
    const handleChange = (e) => {
         setData({...data, [e.target.name]: e.target.value}); 
    }

    const saveJob = async() => {
        await savePost(data);
        navigate(routePath.posts)
    }

    return(
            <>
            <Header />
            <Component>
                <Container>
                    <Typography>Create a job post</Typography>
                    <img src={image} alt="create" />
                </Container>
                <FormWrapper>
                    <TextField
                        placeholder="Job Title"
                        name="profile"
                        onChange={handleChange}
                    />
                    <Dropdown 
                      label="Job Type"
                      id="job-type-label"
                      value={data.type}
                      handleChange={handleChange}
                      name="type"
                      options={options.type}
                    />
                    <TextField
                        placeholder="Job Description"
                        name="description"
                        onChange={handleChange}
                    />    
                    <Dropdown
                      label="Experience"
                      id="job-experience-label"
                      value={data.experience}
                      handleChange={handleChange}
                      options={options.experience} 
                      name="experience"
                    />
                    <Dropdown 
                      label="Technology"
                      id="job-technology-label"
                      value={data.technology}
                      handleChange={handleChange}
                      options={options.technology}
                      name="technology"
                      multiple
                    />
                    <Dropdown 
                      label="Salary"
                      id="job-salary-label"
                      value={data.salary}
                      handleChange={handleChange}
                      options={options.salary}
                      name="salary"
                    />
                    <Button variant="contained" onClick={() => saveJob()}>Save Job</Button>
                </FormWrapper>
            </Component>
            </>
    )
}

export default CreatePost;
