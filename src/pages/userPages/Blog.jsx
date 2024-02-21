import React, { useState } from "react";
import Header from "../../components/UserComponents/Layouts/Header";
import { createBlog } from "../../api/UserApi";

function Blog() {
  const [formData, setFormData] = useState({
    author: '',
    description: '',
  
  });
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0]; 
    setImage(file);
  };
console.log(formData,'ppppppppp');
const handleSubmit = async () => {
  const blogData = {
    ...formData,
    date: new Date(),
    image 
  };
  console.log(blogData, 'blogData');

  const response = await createBlog(blogData);
};

  return (
    <div>
      <Header />
      {/* Add input fields to capture author, description, and date */}
      <input
        type="text"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        placeholder="Author"
      />
      <input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
      />
     
      <input type="file" name='image' onChange={handleImage} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Blog;
