const className = {
  p: "text-justify tracking-wide text-blue-700 text-wrap text-sm px-4 leading-relaxed",
  h3: "text-xl font-bold text-blue-700 leading-relaxed",
};
export const AboutSection = () => {
  return (
    <section
      id="about"
      className="mx-auto flex h-fit w-full max-w-[950px] flex-col items-center justify-center px-4 py-10"
    >
      <h2 className="pb-[70px] text-3xl font-bold tracking-wide text-blue-700">
        About
      </h2>
      <div className="flex w-full flex-col items-start gap-5 px-4">
        <p className="text-wrap text-justify text-sm leading-relaxed tracking-wide text-blue-700">
          Welcome to <strong className="animate-bounce text-xl">NReport</strong>
          , your go-to platform for improving your neighborhood and city by
          reporting issues and staying informed about the latest local news.
        </p>
        <div>
          <h3 className={className.h3}>Our Mission</h3>
          <p className={className.p}>
            At NReport, our mission is to empower citizens to take an active
            role in the maintenance and enhancement of their communities. We
            believe that by providing a simple and efficient way to report
            problems, we can help create safer, cleaner, and more enjoyable
            environments for everyone.
          </p>
        </div>
        <div>
          <h3 className={className.h3}>Our Mission</h3>
          <p className={className.p}>
            At NReport, our mission is to empower citizens to take an active
            role in the maintenance and enhancement of their communities. We
            believe that by providing a simple and efficient way to report
            problems, we can help create safer, cleaner, and more enjoyable
            environments for everyone.
          </p>
        </div>
        <div>
          <h3 className={className.h3}>What We Do</h3>
          <div className="flex flex-col gap-3">
            <div>
              <h4 className="tracking-wide text-blue-700">Report Issues:</h4>
              <p className={className.p}>
                Whether it's a pothole, a broken streetlight, burning trash, or
                any other concern, our platform allows you to quickly and easily
                report problems in your neighborhood or city. Your reports are
                sent directly to the nearest authority or relevant city
                department that can address and resolve the issue.
              </p>
            </div>
            <div>
              <h4 className="tracking-wide text-blue-700">Stay Informed:</h4>
              <p className={className.p}>
                In addition to reporting issues, NReport keeps you updated with
                the latest news and developments in your city. From community
                events to local government announcements, you can stay connected
                and informed about what's happening around you.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={className.h3}>Why Choose NReport?</h3>
          <div className="flex flex-col gap-2">
            <p className={className.p}>
              User-Friendly Interface: Our platform is designed to be easy to
              use, making it simple for anyone to submit a report or find
              information.
            </p>
            <p className={className.p}>
              Direct Impact: Your reports are sent directly to the relevant
              authorities, ensuring that issues are addressed by those who can
              make a difference.
            </p>
            <p className={className.p}>
              Community Focused: We believe in the power of community action. By
              working together, we can create positive changes in our
              neighborhoods and cities.
            </p>
            <p className={className.p}>
              Stay Updated: Never miss important news and updates about your
              city. Our news section keeps you informed about the latest
              developments and events.
            </p>
          </div>
        </div>
        <div>
          <h3 className={className.h3}>Join Us</h3>
          <p className={className.p}>
            Join NReport today and become a part of the solution. Together, we
            can make our neighborhoods and cities better places to live, work,
            and play. Whether you're reporting an issue or staying updated with
            the latest news, your involvement matters.
          </p>
        </div>
        <div>
          <h3 className={className.h3}>Contact Us:</h3>
          <div className="flex flex-col gap-3">
            <p className={className.p}>
              For any inquiries or support, please contact us at
              contact@nreport.com. We’re here to help and look forward to
              working with you to improve our community.
            </p>
            <p className={className.p}>
              Thank you for being a proactive and engaged citizen. Let's make a
              difference together with NReport!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
