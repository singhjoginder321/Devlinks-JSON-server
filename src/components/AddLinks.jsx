import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import "../style/add-links.css";
import Navbar from "./Navbar";

const AddLinks = () => {
  const [links, setLinks] = useState([]);
  const userId = 1; // Assuming userId is known; replace with dynamic fetching if needed

  useEffect(() => {
    // Fetch links associated with the user
    axios
      .get(`http://localhost:3031/links?userId=${userId}`)
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching links:", error);
      });
  }, [userId]);

  const handleAddLink = () => {
    // Add a new link entry with a temporary unique id
    console.log(links);
    const tempId = Date.now();
    setLinks([...links, { id: tempId, platform: "", link: "", userId }]);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index) => {
    const linkToRemove = links[index];
    const tempId = linkToRemove.id;
    console.log(tempId);
    console.log(index);

    // Make a DELETE request using the tempId
    axios
      .delete(`http://localhost:3031/links/${tempId}`)
      .then(() => {
        toast.success("Link deleted!");
        setLinks(links.filter((_, i) => i !== index)); // Update the state to remove the deleted link from the UI
      })
      .catch((error) => console.error("Error deleting link:", error));
  };

  const handleSave = () => {
    // Save new links to API
    links.forEach((link) => {
      if (link.id) {
        console.log(link);
        // Link does not have a server id, so create a new one
        axios
          .post(`http://localhost:3031/links`, link)
          .then((response) => {
            console.log(response);
            // setLinks(newLinks);
            toast.success("Link created!");
          })
          .catch((error) => console.error("Error creating link:", error));
      }
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
                <div className="profile-details-section">
                  <img src={profilePictureImage} alt="Profile Picture" />
                  <span className="name">Joginder Singh</span>
                  <span className="email">jogindersingh@gmail.com</span>
                </div>
                <ul className="links">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href={link.link} className={link.platform}>
                        {link.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="container">
              <h2>Customize your links</h2>
              <span className="add-remove-para">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </span>
              <button id="add-link-btn" onClick={handleAddLink}>
                + Add new link
              </button>
              <form id="links-form">
                {links.map((link, index) => (
                  <div className="link" key={index}>
                    <label htmlFor={`platform-${index}`}>Platform</label>
                    <select
                      id={`platform-${index}`}
                      value={link.platform}
                      onChange={(e) =>
                        handleLinkChange(index, "platform", e.target.value)
                      }
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="youtube">YouTube</option>
                      <option value="gitlab">GitLab</option>
                    </select>
                    <label htmlFor={`link-${index}`}>Link</label>
                    <input
                      type="url"
                      id={`link-${index}`}
                      value={link.link}
                      onChange={(e) =>
                        handleLinkChange(index, "link", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      className="remove-link-btn"
                      onClick={() => handleRemoveLink(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </form>
              <button type="button" className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddLinks;
