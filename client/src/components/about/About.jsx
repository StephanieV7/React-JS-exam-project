export default function About () {
    return(
        <>
                  {/* About */}
                  <div id="about" className="counter">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-xl-6">
                  <div className="image-container">
                    <img
                      className="img-fluid"
                      src="images/about.jpg"
                      alt="alternative"
                    />
                  </div>{" "}
                  {/* end of image-container */}
                </div>{" "}
                {/* end of col */}
                <div className="col-lg-7 col-xl-6">
                  <div className="text-container">
                    <div className="section-title">ABOUT</div>
                    <h2>We|re Passionate About Delivering Growth Services</h2>
                    <p>
                      Our goal is to provide the right business growth services at the
                      appropriate time so companies can benefit from the created
                      momentum and thrive for a long period of time
                    </p>
                    <ul className="list-unstyled li-space-lg">
                      <li className="media">
                        <i className="fas fa-square" />
                        <div className="media-body">
                          Everything we recommend has direct positive impact
                        </div>
                      </li>
                      <li className="media">
                        <i className="fas fa-square" />
                        <div className="media-body">
                          You will become an important partner of our company
                        </div>
                      </li>
                    </ul>
                    {/* Counter */}
                    <div id="counter">
                      <div className="cell">
                        <div className="counter-value number-count" data-count={231}>
                          1
                        </div>
                        <div className="counter-info">
                          Happy
                          <br />
                          Users
                        </div>
                      </div>

                    </div>
                    {/* end of counter */}
                  </div>{" "}
                  {/* end of text-container */}
                </div>{" "}
                {/* end of col */}
              </div>{" "}
              {/* end of row */}
            </div>{" "}
            {/* end of container */}
          </div>{" "}
          {/* end of counter */}
          {/* end of about */}
        </>
    )
}