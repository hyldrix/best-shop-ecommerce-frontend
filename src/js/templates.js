import { StarRating } from './main.js';

export const headerTemplate = `<div class="top-header wrapper">
            <div class="social-icons">
                <a href="#"><i class="fa-brands fa-square-facebook"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-square-instagram"></i></a>
            </div>
            <div class="logo">
                <a href="/src/index.html">
                    <img src="/src/assets/icon-suitcase.png" alt="Best Shop logo" title="Best Shop logo">
                    <span>BEST SHOP</span>
                </a>
            </div>

            <div class="user-icons">
                <a class="login-toggle" href="#">
                    <div class="user-icon"><img src="/src/assets/user.png" alt="user-icon"></div>
                </a>
                <a href="/src/html/cart.html">
                    <div class="cart-icon"><img src="/src/assets/shopping-cart.png">
                        <div class="cart-quantity">?</div>
                    </div>
                </a>
            </div>
        </div>
        <nav>
            <div class="classic-menu">
                <ul class="menu">
                    <li>
                        <a class="nav-link" href="/src/index.html">Home</a>
                        <a class="nav-link" href="/src/html/catalog.html">Catalog<i
                                class="fa-solid fa-chevron-down"></i></a>
                        <a class="nav-link" href="/src/html/about.html">About Us</a>
                        <a class="nav-link" href="/src/html/contact.html">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div class="mobile-menu">
                    <div class="navbar wrapper">
                        <div class="heading">
                            <a href="#hamburger-icon">
                                <i class="hamburger fa fa-bars"></i>
                            </a>
                        </div>
                        <div class="links hidden">
                        <a class="nav-link hidden" href="/src/index.html">Home</a>
                        <a class="nav-link hidden" href="/src/html/catalog.html">Catalog<iclass="fa-solid fa-chevron-down"></i></a>
                        <a class="nav-link hidden" href="/src/html/about.html">About Us</a>
                        <a class="nav-link hidden" href="/src/html/contact.html">Contact Us</a>
                        </div>
                </div>
            </div>
        </nav>
        <div class="modal-backdrop" hidden>
        <div class="login-modal">
            <form id="login-form">

                <a class="closebtn" href="#">X</a>

                <label for="email">Email addres</label>
                <input type="email" id="email" name="email" placeholder="" required>

                <div class="password-container">

                <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="" pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                    <i class="eye-toggle fa-solid fa-eye"></i>
                </div>
                <div class="error-container" hidden></div>



                <div class="settings">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" value="lsRememberMe" id="rememberMe" name="rememberMe">
                        <label for="rememberMe">Remember me</label>
                    </div>
                    <div class="forgot"><a href=#"">Forgot Your Password?</a></div>
                </div>
            </form>
            <a href="" class="loginbtn btn">LOGIN</a>


        </div>
    </div>
        `;



export const footerTemplate = ` <div class="benefits-banner">
<div class="wrapper">
                    <div class="banner">
                        <h5>Our Benefits</h5>
                        <div class="benefits-container">
                            <div class="benefit-card">
                                <img src="/src/assets/benefit1.png" alt="benefit-card" srcset="">
                                <p>Velit nisl sodales eget donec quis. volutpat orci.</p>
                            </div>
                            <div class="benefit-card">
                                <img src="/src/assets/benefit2.png" alt="benefit-card" srcset="">
                                <p>Dolor eu varius. Morbi fermentum velit nisl.</p>
                            </div>
                            <div class="benefit-card">
                                <img src="/src/assets/benefit3.png" alt="benefit-card" srcset="">
                                <p>Malesuada fames ac ante ipsum primis in faucibus.</p>
                            </div>
                            <div class="benefit-card">
                                <img src="/src/assets/benefit4.png" alt="benefit-card" srcset="">
                                <p>Nisl sodales eget donec quis. volutpat orci. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-footer wrapper">
                <div class="site-map">
                    <div class="subsection">
                        <h5><a href="/src/html/about.html">About Us</a></h5>
                        <ul>
                            <li><a href="#">Organisation</a></li>
                            <li><a href="#">Partners</a></li>
                            <li><a href="#">Clients</a></li>
                        </ul>
                    </div>
                    <div class="subsection">
                        <h5>Interesting Links</h5>
                        <ul>
                            <li><a href="#">Photo Gallery</a></li>
                            <li><a href="#">Our Team</a></li>
                            <li><a href="#">Socials</a></li>
                        </ul>
                    </div>
                    <div class="subsection">
                        <h5>Achievements</h5>
                        <ul>
                            <li><a href="#">Winning Awards</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Our Amazing Clients</a></li>
                        </ul>
                    </div>
                    <div class="subsection shipping">
                        <h5>Shipping Information</h5>
                            <span>Nulla eleifend pulvinar purus, molestie euismod odio imperdiet ac. Ut sit amet erat
                                nec nibh rhoncus varius in non lorem. Donec interdum, lectus in convallis pulvinar, enim
                                elit porta sapien, vel finibus erat felis sed neque. Etiam aliquet neque sagittis erat
                                tincidunt aliquam.
                            </span>
                    </div>
                </div>
                <div class="contact-details">
                    <div class="subsection">
                        <h5><a href="/src/html/contact.html">Contact Us </h5>
                        <p>Bendum dolor eu varius. Morbi fermentum velitsodale egetonec. volutpat orci. Sed ipsum felis,
                            tristique egestas et, convallis ac velitn consequat nec luctus.</p>
                    </div>
                    <div class="contact-info">
                        <div class="detail phone">
                            <div class="img"><img src="/src/assets/phone.png" alt=""></div>
                            <div class="contact-text"><span><a href="tel:+632366322">Phone: (+63) 236 6322</a></span></div>
                        </div>
                        <div class="detail phone">
                            <div class="img"><img src="/src/assets/envelope.png" alt=""></div>
                            <div class="contact-text"><span><a href="mailto:public@news.com">public@news.com</a></span></div>
                        </div>
                        <div class="detail phone">
                            <div class="img"><img src="/src/assets/clock.png" alt=""></div>
                            <div class="contact-text"><span>Mon - Fri: 10am - 6pm<br>Sat - Sun: 10am - 6pm</span></div>
                        </div>
                        <div class="detail address">
                            <div class="img"><img src="/src/assets/landmark.png" alt=""></div>
                            <div class="contact-text"><span>639 Jade Valley, Washington DC</span></div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="copyright">
                <span>&copy; Copyright 2025</span>
            </div>
            

       `;


export const offerTemplate = `<div class="wrapper">
                <div class="special-offer-container">
                    <img src="/src/assets/offer of the month image.png" alt="Offer">
                    <div class="special-offer-text">
                        <div class="left-column"><span>50%</span>
                            <p>Curabitur vulputate arcu odio, ac facilisis diam.</p>
                        </div>
                        <div class="right-column">
                            <h4>Offer Of The Month</h4>
                            <p>Curabitur vulputate arcu odio, ac facilisis diam accumsan ut. Ut imperdiet et leo in
                                vulputate.</p>
                            <a href="#" id="getofferbtn" class="btn">Get Offer Today</a>
                        </div>
                    </div>

                </div>
            </div>
             </div>`
    ;



export const productPageTemplate = (product) => `
            <div class="wrapper">
                <div class="product-info-container">
                    <div class="gallery">
                        <div class="main-img-container">
                            <img src="${product.imageUrl}" alt="">
                        </div>
                        <div class="thumbnails">
                            <img src="/src/assets/thumbnail1.png" alt="">
                            <img src="/src/assets/thumbnail2.png" alt="">
                            <img src="/src/assets/thumbnail3.png" alt="">
                            <img src="/src/assets/thumbnail4.png" alt="">
                        </div>
                    </div>
                    <div class="product-details">
                        <h3>${product.name}</h3>
                            <div class="star-rating">
                             ${StarRating.render(product.rating)}              
                              <span>(1 Client Review)</span>
</div>
                        
                        <div class="price">
                            <p>
                                $ ${product.price}
                            </p>

                        </div>
                        <div class="description">
                            <p>The new ${product.name} is a bold reimagining of travel
                                essentials, designed to elevate
                                every
                                journey. Made with at least 30% recycled materials, its lightweight yet impact-resistant
                                shell combines
                                eco-conscious
                                innovation with rugged durability.</p>
                            <p>The ergonomic handle and GlideMotion spinner wheels ensure effortless mobility while
                                making a statement in sleek
                                design.
                                Inside, the modular compartments and adjustable straps keep your belongings secure and
                                neatly organized, no
                                matter the
                                destination.</p>
                        </div>
                        <div class="form-container">
                            <form class="dropdown-form">

                                <label for="size-select">Size</label>
                                <select id="size-select" name="size">
                                    <option value="" selected disabled>Choose option</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="S, M, XL">S, M, XL</option>
                                    <option value="S-L">S-L</option>
                                </select>

                                <label for="color-select">Color</label>
                                <select id="color-select" name="color">
                                    <option value="" selected disabled>Choose option</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="gray">Gray</option>
                                    <option value="green">Green</option>
                                    <option value="black">Black</option>
                                    <option value="pink">Pink</option>
                                    <option value="yellow">Yellow</option>
                                </select>

                                <label for="category-select">Category</label>
                                <select id="category-select" name="category">
                                    <option value="" selected disabled>Choose option</option>
                                    <option value="suitcases">Suitcases</option>
                                    <option value="kids' luggage">Kids' luggage</option>
                                    <option value="carry-ons">Carry-ons</option>
                                    <option value="luggage sets">Luggage Sets</option>
                                </select>
                                <div class="form-controls">
                                    <div class="qty-control">
                                        <button class="decrease">−</button>
                                        <input class="qty" name='qty' type="number" value="1" min="1" max="10">
                                        <button class="increase">+</button>
                                    </div>
                                    <div class="add-to-cart">
                                        <a href="" class="add-to-cart btn">Add to cart</a>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="payment-providers">
                            <span>Payment:</span>

                            <img src="/src/assets/payment-providers/visa-pay-logo.png" alt="">
                            <img src="/src/assets/payment-providers/american-express-logo.png" alt="">
                            <img src="/src/assets/payment-providers/master-card-logo.png" alt="">
                            <img src="/src/assets/payment-providers/paypal-logo.png" alt="">
                        </div>



                    </div>
                </div>
            </div>
            

            
        `;

export const additionalInformationTemplate = (product) => `
        <div class="wrapper">
                <div class="toggle-menu">
                    <ul class="tabs">
                        <li class="tab"><a href="#" data-tab="details">DETAILS</a></li>
                        <li class="tab"><a href="#" data-tab="reviews">REVIEWS</a></li>
                        <li class="tab"><a href="#" data-tab="shipping">SHIPPING POLICY</a></li>
                    </ul>
                </div>
                <div class="details-container">
                    <div class="subsection details active">
                        <p>Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus
                            id neque tempor, in
                            efficitur justo imperdiet. Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl
                            viverra, sit amet aliquet
                            lectus ullamcorper. Praesent luctus lacus non lorem elementum, eu tristique sapien suscipit.
                            Sed bibendum, ipsum nec
                            viverra malesuada, erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est
                            nisi. Pellentesque tristique
                            pretium dolor eu commodo. Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius
                            eget urna sit amet luctus.
                            Suspendisse potenti. Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra
                            dui auctor, ullamcorper
                            turpis pharetra, facilisis quam.</p>
                        <p>
                            Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus.
                            Suspendisse potenti.
                            Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor,
                            ullamcorper turpis pharetra,
                            facilisis quam. Proin iaculis nibh vitae lectus mollis bibendum.
                        </p>
                        <p>
                            Quisque varius eget urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat est,
                            sit amet sodales risus.
                            Pellentesque viverra dui auctor, ullamcorper turpis pharetra, facilisis quam.
                        </p>
                    </div>
                    <div class="subsection reviews">
                        <div class="existing-reviews-container">
                            <p class="review-amount">1 review for ${product.name}</p>
                            <div class="review-card">
                                <div class="img">
                                    <img src="/src/assets/review.png" alt="">
                                </div>
                                <div class="review">
                                    <div class="header-line">
                                        <p class="name">Ella Harper <span class="date">/June 11, 2025</span> </p>
                                        <div class="star-rating" data-rating="${product.rating}">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-alt"></i>
                                        </div>
                                    </div>

                                    <p class="review-text">Proin iaculis nibh vitae lectus mollis bibendum. Quisque
                                        varius eget urna sit amet luctus. Suspendisse potenti curabitur
                                        ac placerat est, sit amet sodales risus.</p>

                                </div>
                            </div>

                        </div>
                        <div class="review-subsection">
                            <h5>Add Review</h5>
                            <p>Your email address won't be shared with anybody. Required fields have the symbol
                                <span>*</span>
                            </p>
                            <div class="form-container">
                                <form id="review-form">
                                    <div class="rate-product">
                                        <span>RATE PRODUCT</span>
                                        <div class="star-rating-input">
                                                 <input type="radio" id="star1" name="rating" value="1">
        <label for="star1"><i class="fas fa-star"></i></label>

        <input type="radio" id="star2" name="rating" value="2">
        <label for="star2"><i class="fas fa-star"></i></label>

        <input type="radio" id="star3" name="rating" value="3">
        <label for="star3"><i class="fas fa-star"></i></label>

        <input type="radio" id="star4" name="rating" value="4">
        <label for="star4"><i class="fas fa-star"></i></label>

        <input type="radio" id="star5" name="rating" value="5">
        <label for="star5"><i class="fas fa-star"></i></label>

                                        </div>
                                    </div>
                                    <div class="main-form-data">
                                        <div class="input-container">
                                            <textarea name="review" placeholder='' id="review-text" required></textarea>
                                            <label class="custom-placeholder" for="review">Your Review </label>
                                        </div>


                                        <div class="contact-details">
                                            <div class="input-container">
                                                <input type="name" placeholder="" name="name" required>
                                                <label class="custom-placeholder" for="name">Your Name </label>
                                            </div>
                                            <div class="input-container">
                                                <input type="email" placeholder="" name="email" required>
                                                <label class="custom-placeholder" for="email">Your Email </label>
                                            </div>

                                        </div>
                                        <div class="save-data-container">
                                            <input type="checkbox" placeholder="" id="save-data" name="save-data"
                                                value="true">
                                            <label for="save-data">Save my name, email and website in this browser for
                                                when I leave another comment</label>

                                        </div>
                                        <div id="success-error"></div>
                                        <a href="" class="submit btn">SUBMIT</a>
                                </form>
                            </div>

                        </div>
                    </div>
                    
                    
                </div>
                <div class="subsection shipping">
                        <p>Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus
                            id neque tempor, in
                            efficitur justo imperdiet. Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl
                            viverra, sit amet aliquet
                            lectus ullamcorper. Praesent luctus lacus non lorem elementum, eu tristique sapien suscipit.
                            Sed bibendum, ipsum nec
                            viverra malesuada, erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est
                            nisi. Pellentesque tristique
                            pretium dolor eu commodo. Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius
                            eget urna sit amet luctus.
                            Suspendisse potenti. Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra
                            dui auctor, ullamcorper
                            turpis pharetra, facilisis quam.</p>
                        <p>
                            Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus.
                            Suspendisse potenti.
                            Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor,
                            ullamcorper turpis pharetra,
                            facilisis quam. Proin iaculis nibh vitae lectus mollis bibendum.
                        </p>
                        <p>
                            Quisque varius eget urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat est,
                            sit amet sodales risus.
                            Pellentesque viverra dui auctor, ullamcorper turpis pharetra, facilisis quam.
                        </p>
                    </div>
            </div>

            </div>`;

export const bestSetTemplate = (product) => {

    let starRating = StarRating.render(product.rating);


    return `<div class="set-product-card">
                            <div class="image-container">
                                <img src="${product.imageUrl}" alt="">
                            </div>
                            <div class="info-container">
                                <span class="product-name">${product.name}</span>
                                <div class="star-rating">${starRating}</div>
                                <span class="price">$${product.price}</span>
                            </div>
                        </div>
                    `;

};
