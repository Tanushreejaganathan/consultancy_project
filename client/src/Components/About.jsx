import React from "react";
import { Smile, Headset } from "lucide-react";
import CountUp from "react-countup";
import { FaHandHoldingUsd, FaBalanceScale, FaChartLine, FaBuilding, FaUsers, FaFileAlt } from "react-icons/fa";

// Import the image
import about from "../asserts/bann1.png";
// import profile from "../asserts/profile.png"

// Info Data
const infoData = [
  {
    icon: <FaHandHoldingUsd className="text-gray-800 text-xl" />,
    label: "Nature of Business",
    value: "Service Provider and Others",
  },
  {
    icon: <FaBalanceScale className="text-gray-800 text-xl" />,
    label: "Legal Status of Firm",
    value: "Proprietorship",
  },
  {
    icon: <FaBuilding className="text-gray-800 text-xl" />,
    label: "GST Registration Date",
    value: "01-07-2017",
  },
  {
    icon: <FaUsers className="text-gray-800 text-xl" />,
    label: "Total Number of Employees",
    value: "Upto 10 People",
  },
  {
    icon: <FaFileAlt className="text-gray-800 text-xl" />,
    label: "GST Number",
    value: "33EZHPS2716sdfB1ZL",
  },
];

// Stats
const stats = [
  {
    icon: <Smile className="text-blue-500 w-12 h-12" aria-label="Happy Clients" />,
    count: 232,
    label: "Happy Clients",
  },
  {
    icon: <Headset className="text-blue-500 w-12 h-12" aria-label="Hours Of Support" />,
    count: 24,
    label: "Hours Of Support",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Profile Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#000",
          backgroundColor: "#f0f8ff", // Light blue background
          borderRadius: "10px",
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <img
          src={about} // Correctly use the imported image here
          alt="Rounded"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "15px",
            border: "2px solid #ccc",
            marginRight: "20px",
            marginBottom: "10px",
          }}
        />
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>name R</h2>
          <p style={{ marginTop: "10px" }}>M.D</p>
          <p style={{ marginTop: "5px" }}>ITI</p>
          <p style={{ marginTop: "5px" }}>25 Year's Experience</p>
        </div>
      </div>

      {/* About Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            backgroundColor: "#f0f8ff", // Light blue background
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <figure
            style={{
              flex: "1",
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <img
             src = {about}
              alt="About Us"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </figure>
          <div
            style={{
              flex: "1",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Customer Satisfaction is Our Success
            </h2>
            <h3
              style={{
                fontSize: "20px",
                color: "#000",
              }}
            >
              SINCE 2018
            </h3>
            <p
              style={{
                marginTop: "10px",
                fontSize: "18px",
                color: "#666",
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi necessitatibus officiis fuga sit consequuntur temporibus soluta unde, at error quaerat ex eveniet veniam nam culpa voluptatibus quas neque? Alias quos modi deserunt quae, reiciendis culpa cum quod voluptatum vero asperiores a labore officiis voluptate magnam nemo laudantium? Voluptas, accusamus porro!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section
        id="stats-counter"
        style={{
          padding: "40px 0",
          backgroundColor: "#e6f7ff", // Lighter blue background
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>{stat.icon}</div>
              <CountUp
                start={0}
                end={stat.count}
                duration={1}
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#007bff", // Dark blue
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Info Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {infoData.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 calc(50% - 20px)",
              maxWidth: "300px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                backgroundColor: "#f0f8ff", // Light blue background
                padding: "10px",
                borderRadius: "50%",
              }}
            >
              {item.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr
        style={{
          borderTop: "2px solid #ccc",
          width: "100%",
        }}
      />

      {/* Footer */}
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#e6f7ff", // Lighter blue background
          color: "#000",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#666",
          }}
        >
          &copy; 2025 VELLAN. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
