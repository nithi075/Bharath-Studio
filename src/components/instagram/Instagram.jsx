import { useEffect, useState } from "react";
import "./Instagram.css";
import { apiGet, toImageUrl } from "../../api/api";

// Existing instagram images
import Insta1 from "../../assets/insta1.jpg";
import Insta2 from "../../assets/insta2.jpg";
import Insta3 from "../../assets/insta3.jpg";
import Insta4 from "../../assets/insta4.jpg";
import Insta5 from "../../assets/insta5.jpg";
import Insta6 from "../../assets/insta6.jpg";

const POSTS = [
  Insta1,
  Insta2,
  Insta3,
  Insta4,
  Insta5,
  Insta6,
];

const MAX_POSTS = 6;

function Instagram() {
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    apiGet("/api/instagram")
      .then((data) => setAdminPosts(data))
      .catch((err) =>
        console.error("Failed to load admin instagram posts:", err)
      );
  }, []);

  // Show only latest 6 uploaded posts
  const uploadedPosts = adminPosts
    .slice(-MAX_POSTS)
    .map((post) => ({
      image: toImageUrl(post.imageUrl),
      id: post._id,
    }));

  // Remaining slots are filled by default images
  const remaining = MAX_POSTS - uploadedPosts.length;

  const defaultPosts = POSTS.slice(0, remaining).map((image) => ({
    image,
  }));

  const allPosts = [...defaultPosts, ...uploadedPosts];

  return (
    <section className="instagram" id="instagram">
      <div className="container">
        <div className="instagram__header">
          <p className="eyebrow">Art Lives in the Everyday</p>

          <h2 className="section-heading">
            On <em>Instagram</em>
          </h2>
        </div>

        <div className="instagram__wrapper">
          <div className="instagram__grid">
            {allPosts.map((post, index) => (
              <a
                href="https://www.instagram.com/bharath_studio_/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram__item"
                key={post.id || index}
              >
                <img
                  src={post.image}
                  alt={`From the studio's Instagram, frame ${index + 1}`}
                  className="instagram__image"
                />

                <div className="instagram__overlay">
                  View on Instagram
                </div>
              </a>
            ))}
          </div>

          <div className="instagram__card">
            <p className="eyebrow">@bharath_studio_</p>

            <h3>Follow the Journey</h3>

            <p>
              Behind-the-scenes moments, latest shoots, and quiet
              in-betweens — straight from the field.
            </p>

            <a
              href="https://www.instagram.com/bharath_studio_/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram__button"
            >
              Follow Along
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Instagram;