import { Login } from "./login";
import { LoginCard } from "./loginCard";

export function HomeSection() {
  return (
    <section className="container py-5">
      <div className="row align-items-center gy-5 mt-5">

        {/* Left */}
        <div className="col-12 col-lg-6 text-center text-lg-start">
          <h1 className="display-4 fw-bold">
            Organize Your Tasks.
          </h1>

          <h1 className="display-4 fw-bold mb-4">
            Simplify Your Life.
          </h1>

          <p className="lead text-secondary">
            TaskFlow helps you create, organize, and track your daily tasks so
            you can stay focused and productive.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <button className="btn btn-primary px-4">
              Get Started Free
            </button>

            <button className="btn btn-outline-primary px-4">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="col-12 col-lg-6">
          <LoginCard />
        </div>

      </div>
    </section>
  );
}