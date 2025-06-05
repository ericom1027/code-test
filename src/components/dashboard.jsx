import React, { useState } from "react";
import {
  Form,
  Button,
  Badge,
  InputGroup,
  Collapse,
  Card,
} from "react-bootstrap";

const missions = [
  {
    id: 1,
    name: "GPS SV05",
    status: "upcoming",
    time: "in a year",
    description: "No image yet. no image yet. ",
  },
  {
    id: 2,
    name: "GTO-2",
    status: "upcoming",
    time: "5 hours ago",
    description:
      "GTO-2 mission will place a commercial communications satellite into geostationary orbit.",
    image: "https://via.placeholder.com/400x200?text=GTO-2+Image",
    video: "https://via.placeholder.com/400x200?text=GTO-2+Video",
  },
  {
    id: 3,
    name: "CRS-21",
    status: "upcoming",
    time: "1 day ago",
    description:
      "The 21st Commercial Resupply Services (CRS) mission for NASA delivering cargo to the ISS.",
    image: "https://via.placeholder.com/400x200?text=CRS-21+Image",
    video: "https://via.placeholder.com/400x200?text=CRS-21+Video",
  },
  {
    id: 4,
    name: "SXM-8",
    status: "upcoming",
    time: "3 days ago",
    description:
      "SiriusXM's SXM-8 satellite will provide satellite radio service across North America.",
    image: "https://via.placeholder.com/400x200?text=SXM-8+Image",
    video: "https://via.placeholder.com/400x200?text=SXM-8+Video",
  },
  {
    id: 5,
    name: "Amos-17",
    status: "upcoming",
    time: "2 days ago",
    description:
      "Amos-17 is a high-throughput satellite aimed to deliver internet connectivity across Africa.",
    image: "https://via.placeholder.com/400x200?text=Amos-17+Image",
    video: "https://via.placeholder.com/400x200?text=Amos-17+Video",
  },
  {
    id: 6,
    name: "Trailblazer",
    status: "failed",
    time: "2 years ago",
    description:
      "Trailblazer was lost during the launch due to stage malfunction.",
    image: "https://via.placeholder.com/400x200?text=Trailblazer+Image",
    video: "https://via.placeholder.com/400x200?text=Trailblazer+Video",
  },
  {
    id: 7,
    name: "DemoSat",
    status: "failed",
    time: "12 years ago",
    description:
      "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30's Failed to reach orbit, Failed to recover first stage.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4FksxPbxta7t6cY5V6-HZQvhxMq6F3AaPA&s",

    article: "https://en.wikipedia.org/wiki/DemoSat",
    video: "https://www.youtube.com/watch?v=gZGKasWXFr0",
  },
  {
    id: 8,
    name: "FalconSat",
    status: "failed",
    time: "4 years ago",
    description:
      "FalconSat was part of a U.S. Air Force Academy project, lost due to early engine shutdown.",
    image: "https://via.placeholder.com/400x200?text=FalconSat+Image",
    video: "https://via.placeholder.com/400x200?text=FalconSat+Video",
  },
  {
    id: 9,
    name: "CRS-18",
    status: "success",
    time: "6 hours ago",
    description:
      "SpaceX's Commercial Resupply Services mission out of total of 20 such contracted flights for NASA...",
    image:
      "https://www.americaspace.com/wp-content/uploads/2019/07/CRS-18-patch.jpg",
    video: "https://www.youtube.com/watch?v=SlgrxVuP5jk",
  },
  {
    id: 10,
    name: "ANASIS-II",
    status: "upcoming",
    time: "8 hours ago",
    description:
      "ANASIS-II is South Korea's first dedicated military communications satellite.",
    image: "https://via.placeholder.com/400x200?text=ANASIS-II+Image",
    video: "https://via.placeholder.com/400x200?text=ANASIS-II+Video",
  },
  {
    id: 11,
    name: "CCtCap Demo Mission 2",
    status: "upcoming",
    time: "12 hours ago",
    description:
      "Crew Dragon Demo-2 is the first crewed test flight to the International Space Station.",
    image: "https://via.placeholder.com/400x200?text=Demo-2+Image",
    video: "https://via.placeholder.com/400x200?text=Demo-2+Video",
  },
];

export default function Component() {
  const [search, setSearch] = useState("");
  const [openMissionId, setOpenMissionId] = useState(null);

  const handleToggle = (id) => {
    setOpenMissionId(openMissionId === id ? null : id);
  };

  const filteredMissions = missions.filter((mission) =>
    mission.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {filteredMissions.map((mission) => (
        <Card key={mission.id} className="mb-3 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">{mission.name}</h5>
              <Badge
                bg={
                  mission.status === "success"
                    ? "success"
                    : mission.status === "failed"
                    ? "danger"
                    : "info"
                }
                pill
              >
                {mission.status}
              </Badge>
            </div>
          </Card.Body>

          <Collapse in={openMissionId === mission.id}>
            <div className="p-3 border-top">
              <div className="d-flex justify-content-start align-items-center gap-3 mb-2">
                <span className="text-muted small">{mission.time}</span>

                {mission.article && (
                  <a
                    href={mission.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Article
                  </a>
                )}

                {mission.video && (
                  <a
                    href={mission.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Video
                  </a>
                )}
              </div>

              <div className="d-flex gap-3 mb-3">
                {mission.image && (
                  <img
                    src={mission.image}
                    alt={`${mission.name} mission`}
                    style={{
                      width: "150px",
                      height: "auto",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                )}
                <p className="mb-0">{mission.description}</p>
              </div>
            </div>
          </Collapse>

          <div className="d-flex justify-content-start px-3 pb-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleToggle(mission.id)}
            >
              {openMissionId === mission.id ? "HIDE" : "VIEW"}
            </Button>
          </div>
        </Card>
      ))}

      {filteredMissions.length === 0 ? (
        <p className="text-center text-muted">No missions found.</p>
      ) : (
        <p className="text-center text-muted">End of List</p>
      )}
    </div>
  );
}
