import { ZapIcon } from "lucide-react";
import "./RateLimitedUI.css";

const RateLimitedUI = () => {
  return (
    <div className="rate-limit-container">
      <div className="rate-limit-card">
        <div className="rate-limit-content">
          <div className="rate-limit-icon-wrapper">
            <ZapIcon className="rate-limit-icon" />
          </div>

          <div className="rate-limit-message">
            <h3 className="rate-limit-title">
              Rate Limit Reached
            </h3>

            <p className="rate-limit-description">
              You've made too many requests in a short period. Please wait a
              moment.
            </p>

            <p className="rate-limit-subdescription">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;