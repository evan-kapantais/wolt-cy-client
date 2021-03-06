// Core imports
import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

// Top-level component imports
import Layout from "../components/layout";
import Seo from "../components/seo";

// Component imports
import Loading from "../components/Loading";
import Topic from "../components/Topic";
import Menu from "../components/Menu";
import ImageOverlay from "../components/ImageOverlay";
import Aside from "../components/Aside";
import SelectTopicSection from "../components/SelectTopicSection";
import DecoSection from "../components/DecoSection";
import BackToTop from "../components/BackToTop";
import NewsSection from "../components/NewsSection";
import BannerSection from "../components/BannerSection";

// Animation inports
import {
  animateBanner,
  handleScroll,
  stickHeader,
  animateMenu,
  animateHeader,
  showBackToTop,
} from "../utils/animations";

const IndexPage = ({ data }) => {
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  // Sourced content
  const fetchedTopics = data.allStrapiSection.edges;
  const topicsOrder = data.strapiTopicsOrder.order.split("\n");
  const newsItems = data.allStrapiNewsItem.edges;
  const decoImage = getImage(data.strapiDecorativeImage.image.localFile);

  // Order topics on load
  useEffect(() => {
    const orderedTopics = [];

    topicsOrder.forEach(title => {
      const found = fetchedTopics.find(topic => topic.node.title === title);

      if (found) {
        orderedTopics.push(found);
      }
    });

    setTopics([...orderedTopics]);
    setIsLoading(false);
  }, [fetchedTopics, topicsOrder]);

  // Init event listeners after loading
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      window.addEventListener("scroll", showBackToTop);
      window.addEventListener("scroll", stickHeader);
      window.addEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  // Focus the images after loading has finished
  useEffect(() => {
    if (!isLoading) {
      const images = document.querySelectorAll("img");

      images.forEach(image => {
        if (!image.dataset.nofocus) {
          image.addEventListener("click", e =>
            setImageSource(e.currentTarget.src)
          );
        }
      });
    }
  }, [isLoading]);

  // Cotrol document overflow && menu
  useEffect(() => {
    if (!isLoading) {
      const html = window.document.querySelector("html");

      isMenuOpen
        ? (html.style.overflowY = "hidden")
        : (html.style.overflowY = "scroll");

      animateHeader(isMenuOpen);
      animateMenu(isMenuOpen);
    }
  }, [isMenuOpen, isLoading]);

  // Remove empty elements after loading has finished
  useEffect(() => {
    if (!isLoading) {
      const newsItemElements = document.querySelectorAll(".news-item *");
      const sectionBreaks = document.querySelectorAll(".section br");

      newsItemElements.forEach(element => {
        if (element.innerHTML === "&nbsp;") {
          element.remove();
        }
      });

      sectionBreaks.forEach(br => {
        br.remove();
      });
    }
  }, [isLoading]);

  // Animate banner on load
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        animateBanner();
      });
    }
  }, [isLoading]);

  return (
    <Layout isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
      <Seo title="FAQ" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BannerSection data={data} />
          <NewsSection newsItems={newsItems} />
          <SelectTopicSection topics={topics} />
          <DecoSection decoImage={decoImage} />
          <section id="main-content">
            <Aside topics={topics} />
            <section id="topics" className="topics-section">
              <div id="center-container">
                {topics.map((topic, i) => (
                  <Topic key={i} topic={topic} />
                ))}
              </div>
            </section>
            <div></div>
          </section>
          {imageSource && (
            <ImageOverlay source={imageSource} setSource={setImageSource} />
          )}
          <Menu
            topics={topics}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <BackToTop />
        </>
      )}
    </Layout>
  );
};

export const data = graphql`
  query {
    allStrapiSection(sort: { fields: strapiId, order: ASC }) {
      edges {
        node {
          strapiId
          emoji
          title
          section {
            content
            title
          }
        }
      }
    }
    strapiTopicsOrder {
      order
    }
    strapiBannerText {
      text
    }
    strapiBannerImage {
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    allStrapiNewsItem {
      edges {
        node {
          title
          content
        }
      }
    }
    strapiDecorativeImage {
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    strapiVersion {
      date(formatString: "MMMM, YYYY")
    }
  }
`;

export default IndexPage;
