import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImageIcon from "../assets/images/image-icon.png";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import "../style/profile.css";
import Navbar from "./Navbar";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Fetch user profile from API
    axios
      .get(`http://localhost:3031/profile`)
      .then((response) => {
        if (response.data && Object.keys(response.data).length > 0) {
          const user = response.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setProfilePicture(user.picture || profilePictureImage);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      firstName,
      lastName,
      email,
      picture: profilePicture,
    };
    console.log(profile);

    // Make a PUT request to update the profile
    axios
      .put(`http://localhost:3031/profile`, profile)
      .then(() => {
        toast.success("Profile saved!");
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="full-section">
        <div className="main-section">
          <div className="left">
            <div className="smartphone">
              <div className="profile-container">
                <div className="profile-detail-section">
                  <img src={profilePictureImage} alt="Profile" />
                  <span className="name">Joginder Singh</span>
                  <span className="email">jogindersingh@gmail.com</span>
                </div>
                <ul className="links">
                  <li>
                    <a href="#" className="github">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="linkedin">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="youtube">
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" className="facebook">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="gitlab">
                      GitLab
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="container">
              <h2>Profile Details</h2>
              <form id="profile-form" onSubmit={handleSubmit}>
                <div className="profile-upload-container">
                  <div className="upload-label">
                    <label htmlFor="profile-picture">Profile picture</label>
                  </div>
                  <div className="upload-area">
                    <input
                      type="file"
                      id="profile-picture"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                    <label htmlFor="profile-picture" className="upload-button">
                      <img
                        src={uploadImageIcon}
                        alt="Upload Icon"
                        className="upload-icon"
                      />
                      <span>+ Upload Image</span>
                    </label>
                  </div>
                  <div className="upload-info">
                    <p>
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                  </div>
                </div>
                <div className="enter-details">
                  <div className="form-group">
                    <label htmlFor="first-name">First name*</label>
                    <input
                      type="text"
                      id="first-name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name">Last name*</label>
                    <input
                      type="text"
                      id="last-name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="submit-button">
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
