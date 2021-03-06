import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const SelectTopicSection = ({ topics }) => {
  return (
    <section id="select-topic" className="large-topics">
      <div>
        <h2>Διάλεξε κατηγορία..</h2>
        <ul className="large-topics-grid">
          {topics.map((topic, i) => (
            <li key={i} className="topic-item">
              <Link
                to={`#${topic.node.title.toLowerCase().replace(/\s/g, "-")}`}
                className="topic-link"
              >
                <div>{topic.node.emoji}</div>
                {topic.node.title}
              </Link>
            </li>
          ))}
        </ul>
        <h2>..ή συνέχισε παρακάτω.</h2>
        <Link to="#topics" className="scroll-link">
          <StaticImage
            src="../images/chevron-up-black.svg"
            alt="back to top icon"
            className="scroll-arrow"
            data-nofocus
          />
        </Link>
      </div>
    </section>
  );
};

export default SelectTopicSection;
