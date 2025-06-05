import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Card,
  Badge,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";

function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
  if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
  if (minutes > 0)
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  return "Just now";
}

export default function SpaceXMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [expanded, setExpanded] = useState({});

  const pageSize = 10;

  const fetchMissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: search ? { name: { $regex: search, $options: "i" } } : {},
          options: {
            page,
            limit: pageSize,
            sort: { date_utc: "desc" },
          },
        }),
      });
      const data = await res.json();

      if (page === 1) {
        setMissions(data.docs);
        setExpanded({});
      } else {
        setMissions((prev) => [...prev, ...data.docs]);
      }
      setHasMore(data.docs.length === pageSize);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {missions.map((mission) => (
        <Card key={mission.id} className="mb-3 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>{mission.name}</h5>
              <Badge
                pill
                bg={
                  mission.success === true
                    ? "success"
                    : mission.success === false
                    ? "danger"
                    : "info"
                }
              >
                {mission.success === true
                  ? "Success"
                  : mission.success === false
                  ? "Failed"
                  : "Upcoming"}
              </Badge>
            </div>

            {!expanded[mission.id] && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => toggleExpanded(mission.id)}
              >
                View
              </Button>
            )}

            {expanded[mission.id] && (
              <>
                <p className="mb-2">{timeAgo(mission.date_utc)}</p>

                <div className="d-flex mb-3" style={{ gap: "15px" }}>
                  {mission.links?.article && (
                    <a
                      href={mission.links.article}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "underline", color: "#0d6efd" }}
                    >
                      Article
                    </a>
                  )}
                  {mission.links?.webcast && (
                    <a
                      href={mission.links.webcast}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "underline", color: "#0d6efd" }}
                    >
                      Video
                    </a>
                  )}
                </div>

                <div className="d-flex">
                  <img
                    src={
                      mission.links?.patch?.small ||
                      "https://via.placeholder.com/100?text=No+Image"
                    }
                    alt={mission.name}
                    style={{
                      width: "100px",
                      height: "auto",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <p>{mission.details || "No description available."}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="mt-3"
                  onClick={() => toggleExpanded(mission.id)}
                >
                  Hide
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && missions.length === 0 && (
        <p className="text-center text-muted">No missions found.</p>
      )}

      {!hasMore && missions.length > 0 && (
        <p className="text-center text-muted">End of list.</p>
      )}
    </div>
  );
}
