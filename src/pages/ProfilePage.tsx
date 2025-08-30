import { useUserStore } from "../store/user.store";
import { Header } from "../components/HomeComponent";
import { useGetBooking } from "../hooks/useBooking";
import BookingCard from "../components/BookingCards";
import BookingCardSkeleton from "../skeleton/BookingCardSkeleton";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
function ProfilePage() {
  const user = useUserStore((state) => state?.user);
  const removeUser = useUserStore((state) => state?.removeUser);
  const { data, isLoading } = useGetBooking();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["access_token"]);

  const handleLogout = () => {
    removeUser();
    removeCookie("access_token", { path: "/" });
    navigate("/");
  };

  return (
    <>
      <div className="min-vh-100 bg-light">
        <div className="position-sticky z-1 top-0 bg-light">
          <Header />
        </div>
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div
                  className="bg-gradient position-relative"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(68, 68, 70) 0%,rgb(19, 19, 20) 100%)",
                    height: "200px",
                  }}
                >
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <img
                          src={user?.profile_image_url || user?.fallback_image}
                          alt={user?.full_name}
                          className="rounded-circle border border-4 border-white shadow-lg"
                          width="120"
                          height="120"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="position-absolute bottom-0 end-0">
                          <span className="badge bg-success rounded-pill border border-2 border-white">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="card-body pt-5 pb-4 text-center">
                  <h2 className="card-title fw-bold mb-1 text-dark">
                    {user?.full_name}
                  </h2>

                  <p className="text-muted mb-3">
                    <i className="fas fa-envelope me-2"></i>
                    {user?.email}
                  </p>
                </div>

                {/* Stats Section */}
                <div className="card-footer bg-white border-0 py-4">
                  <div className="row text-center g-0">
                    <div className="col-6">
                      <h5 className="fw-bold text-primary mb-1">{user?.id}</h5>
                      <small className="text-muted">ID</small>
                    </div>
                    <div className="col-6">
                      <div className="border-end">
                        <h5 className="fw-bold text-primary mb-1">
                          {data?.length}
                        </h5>
                        <small className="text-muted">Bookings</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex  justify-content-center mb-4  align-items-center">
                  <button
                    className="btn btn-lg btn-outline-danger"
                    onClick={() => handleLogout()}
                  >
                    logout
                  </button>
                </div>
              </div>

              <div className="mt-4 row">
                {data?.map((booking, idx) => (
                  <BookingCard key={idx} booking={booking} />
                ))}
                {isLoading && (
                  <>
                    {[...Array(5)].map((_, index) => (
                      <BookingCardSkeleton key={index} />
                    ))}
                  </>
                )}
                {data?.length == 0 && (
                  <div className="d-flex my-5 flex-column justify-content-center align-items-center">
                    <h3>No bookings yet 😔</h3>
                    <span className="my-2">
                      Start exploring and book your first trip from our home
                      page.
                    </span>
                    <button
                      className="btn btn-lg btn-outline-secondary mt-4"
                      onClick={() => navigate("/home")}
                    >
                      Go Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
