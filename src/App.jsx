



// Przedmioty na stronie głównej
function FeatureItem({ image, price, description }){
  return (
    <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img src={image} alt="" />
            <h2>{price}</h2>
            <p>{description}</p>
            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
          </div>
          <div className="product-overlay">
            <div className="overlay-content">
              <h2>{price}</h2>
              <p>{description}</p>
              <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
            </div>
          </div>
        </div>
        <div className="choose">
          <ul className="nav nav-pills nav-justified">
            <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
            <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}





//Przedmioty poniżej strony główen (nie ma ich dodanych)
// function ProductItem({ image, price, description }){
//   return (
//     <div className="col-sm-3">
//       <div className="product-image-wrapper">
//         <div className="single-products">
//           <div className="productinfo text-center">
//             <img src={image} alt="" />
//             <h2>{price}</h2>
//             <p>{description}</p>
//             <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {

  return (
    <>
    

    <header id="header">
    {/* <!-- header_top --> */}
    <div className="header_top">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="contactinfo">
              <ul className="nav nav-pills">
                <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="social-icons pull-right">
              <ul className="nav navbar-nav">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- /header_top --> */}
    
    {/* <!-- header-middle --> */}
    <div className="header-middle">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="logo pull-left">
              <a href="index.html"><img src="./src/assets/home/logo.png" alt="" /></a>
            </div>
            <div className="btn-group pull-right">
              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                  USA
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Canada</a></li>
                  <li><a href="#">UK</a></li>
                </ul>
              </div>
              
              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                  DOLLAR
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Canadian Dollar</a></li>
                  <li><a href="#">Pound</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="shop-menu pull-right">
              <ul className="nav navbar-nav">
                <li><a href="#"><i className="fa fa-user"></i> Account</a></li>
                <li><a href="#"><i className="fa fa-star"></i> Wishlist</a></li>
                <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                <li><a href="login.html"><i className="fa fa-lock"></i> Login</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- /header-middle --> */}
    
    {/* <!-- header-bottom --> */}
    <div className="header-bottom">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="mainmenu pull-left">
              <ul className="nav navbar-nav collapse navbar-collapse">
                <li><a href="index.html" className="active">Home</a></li>
                <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                  <ul role="menu" className="sub-menu">
                    <li><a href="shop.html">Products</a></li>
                    <li><a href="product-details.html">Product Details</a></li> 
                    <li><a href="checkout.html">Checkout</a></li> 
                    <li><a href="cart.html">Cart</a></li> 
                    <li><a href="login.html">Login</a></li> 
                  </ul>
                </li> 
                <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                  <ul role="menu" className="sub-menu">
                    <li><a href="blog.html">Blog List</a></li>
                    <li><a href="blog-single.html">Blog Single</a></li>
                  </ul>
                </li> 
                <li><a href="404.html">404</a></li>
                <li><a href="contact-us.html">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="search_box pull-right">
              <input type="text" placeholder="Search"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- /header-bottom --> */}
  </header>

      {/* Slider */}
      <section id="slider">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                                <li data-target="#slider-carousel" data-slide-to="1"></li>
                                <li data-target="#slider-carousel" data-slide-to="2"></li>
                            </ol>

                            <div className="carousel-inner">
                                <div className="item active">
                                    <div className="col-sm-6">
                                        <h1><span>E</span>-SHOPPER</h1>
                                        <h2>Free E-Commerce Template</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                        <button type="button" className="btn btn-default get">Get it now</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="./src/assets/home/girl1.jpg" className="girl img-responsive" alt="" />
                                        <img src="./src/assets/home/pricing.png"  className="pricing" alt="" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="col-sm-6">
                                        <h1><span>E</span>-SHOPPER</h1>
                                        <h2>100% Responsive Design</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                        <button type="button" className="btn btn-default get">Get it now</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="./src/assets/home/girl2.jpg" className="girl img-responsive" alt="" />
                                        <img src="./src/assets/home/pricing.png"  className="pricing" alt="" />
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="col-sm-6">
                                        <h1><span>E</span>-SHOPPER</h1>
                                        <h2>Free Ecommerce Template</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                        <button type="button" className="btn btn-default get">Get it now</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="./src/assets/home/girl3.jpg" className="girl img-responsive" alt="" />
                                        <img src="./src/assets/home/pricing.png" className="pricing" alt="" />
                                    </div>
                                </div>
                            </div>

                            <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>







        <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="left-sidebar">
              <h2>Category</h2>
              <div className="panel-group category-products" id="accordian">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordian"
                        href="#sportswear"
                      >
                        <span className="badge pull-right">
                          <i className="fa fa-plus"></i>
                        </span>
                        Sportswear
                      </a>
                    </h4>
                  </div>
                  <div id="sportswear" className="panel-collapse collapse">
                    <div className="panel-body">
                      <ul>
                        <li><a href="#">Nike</a></li>
                        <li><a href="#">Under Armour</a></li>
                        <li><a href="#">Adidas</a></li>
                        <li><a href="#">Puma</a></li>
                        <li><a href="#">ASICS</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordian"
                        href="#mens"
                      >
                        <span className="badge pull-right">
                          <i className="fa fa-plus"></i>
                        </span>
                        Mens
                      </a>
                    </h4>
                  </div>
                  <div id="mens" className="panel-collapse collapse">
                    <div className="panel-body">
                      <ul>
                        <li><a href="#">Fendi</a></li>
                        <li><a href="#">Guess</a></li>
                        <li><a href="#">Valentino</a></li>
                        <li><a href="#">Dior</a></li>
                        <li><a href="#">Versace</a></li>
                        <li><a href="#">Armani</a></li>
                        <li><a href="#">Prada</a></li>
                        <li><a href="#">Dolce and Gabbana</a></li>
                        <li><a href="#">Chanel</a></li>
                        <li><a href="#">Gucci</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a
                        data-toggle="collapse"
                        data-parent="#accordian"
                        href="#womens"
                      >
                        <span className="badge pull-right">
                          <i className="fa fa-plus"></i>
                        </span>
                        Womens
                      </a>
                    </h4>
                  </div>
                  <div id="womens" className="panel-collapse collapse">
                    <div className="panel-body">
                      <ul>
                        <li><a href="#">Fendi</a></li>
                        <li><a href="#">Guess</a></li>
                        <li><a href="#">Valentino</a></li>
                        <li><a href="#">Dior</a></li>
                        <li><a href="#">Versace</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Kids</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Fashion</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Households</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Interiors</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Clothing</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Bags</a></h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Shoes</a></h4>
                  </div>
                </div>
              </div>
              <div className="brands_products">
                <h2>Brands</h2>
                <div className="brands-name">
                  <ul className="nav nav-pills nav-stacked">
                    <li><a href="#"> <span className="pull-right">(50)</span>Acne</a></li>
                    <li><a href="#"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                    <li><a href="#"> <span className="pull-right">(27)</span>Albiro</a></li>
                    <li><a href="#"> <span className="pull-right">(32)</span>Ronhill</a></li>
                    <li><a href="#"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                    <li><a href="#"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                    <li><a href="#"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                  </ul>
                </div>
              </div>
              <div className="price-range">
                <h2>Price Range</h2>
                <div className="well text-center">
                  <input type="text" className="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
                  <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                </div>
              </div>
              <div className="shipping text-center">
                <img src="./src/assets/home/shipping.jpg" alt="" />
              </div>
            </div>
          </div>
          
          <div className="col-sm-9 padding-right">
            <div className="features_items">
              <h2 className="title text-center">Features Items</h2>
              <FeatureItem image="src/assets/home/product1.jpg" price="$56" description="Easy Polo Black Edition" />
              <FeatureItem image="src/assets/home/product2.jpg" price="$56" description="Easy Polo Black Edition" />
              <FeatureItem image="src/assets/home/product3.jpg" price="$56" description="Easy Polo Black Edition" />
              <FeatureItem image="src/assets/home/product4.jpg" price="$56" description="Easy Polo Black Edition" />
              <FeatureItem image="src/assets/home/product5.jpg" price="$56" description="Easy Polo Black Edition" />
              <FeatureItem image="src/assets/home/product6.jpg" price="$56" description="Easy Polo Black Edition" />
            </div>
          </div>
        </div>
        

        <div className="recommended_items">
      <h2 className="title text-center">recommended items</h2>

      <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="item active">
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="./src/assets/home/recommend3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
          <i className="fa fa-angle-left"></i>
        </a>
        <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
          <i className="fa fa-angle-right"></i>
        </a>
      </div>
    </div>

      </div>
    </section>



    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="companyinfo">
                <h2><span>e</span>-shopper</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="col-sm-3">
                <div className="video-gallery text-center">
                  <a href="#">
                    <div className="iframe-img">
                      <img src="./src/assets/home/iframe1.png" alt="" />
                    </div>
                    <div className="overlay-icon">
                      <i className="fa fa-play-circle-o"></i>
                    </div>
                  </a>
                  <p>Circle of Hands</p>
                  <h2>24 DEC 2014</h2>
                </div>
              </div>
              {/* Pozostałe elementy */}
            </div>
            <div className="col-sm-3">
              <div className="address">
                <img src="./src/assets/home/map.png" alt="" />
                <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

        
    </>
  )
}

export default App
