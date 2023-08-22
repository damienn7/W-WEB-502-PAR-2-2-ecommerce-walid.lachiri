import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Dropdown from './Dropdown/dropdown';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import "../style/font.css";
import axios from 'axios';

const MIN_NUMBER_OF_CHARCTERS_TO_TRIGGER_RESULTS = 3;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  // console.log(searchText);
  useEffect(() => {
    handleItems()
  }, [])



  const handleSearch = (search) => {

    // let suggestionMenu = document.getElementById("turbozizi");
    let research = search.currentTarget.value
    document.addEventListener("click", (event) => {
      if (event.target.id !== "turbozizi") {
        // research = "";
        setSearchQuery([])
      }
    })


    if (research.length >= MIN_NUMBER_OF_CHARCTERS_TO_TRIGGER_RESULTS) {
      fetch("http://localhost:8000/api/articles/searchSuggestion/" + research)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then(data => {
          console.log(data)
          setSearchQuery(data)
        })
    }
    else {
      setSearchQuery([])
    }
  }

  const SearchSuggestions = () => {
    return (
      <Box id="turbozizi" sx={{ position: "absolute", marginTop: "40px", background: "white", color: "black", width: "20rem", zIndex: "1000", padding: "2rem", border: "1px solid black" }}>
        <div className='search__suggestions' >
          {searchQuery.map(article => (
            <a className='search__suggestion' href={'/articles/search/' + article.category + "/" + article.sub_category + "/" + article.idefix + "/"} onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>
              <img src={article.image} className="search__image" alt="product" />
              <p>{article.name}</p>
              <p align="right">{article.price}</p>
            </a>
          ))}
        </div>
      </Box>
    )
  }


  const [noItems, setNoItems] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [anchorElBasket, setAnchorElBasket] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenBasket = Boolean(anchorElBasket);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [result, setResult] = React.useState(0);
  const [countItem, setCountItem] = React.useState(0);
  const [orderId, setOrderId] = React.useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseBasket = () => {
    setAnchorElBasket(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleBasketMenuOpen = async (event) => {
    handleItems();
    setAnchorElBasket(event.target);
  }

  function handleItems() {
    axios
      .get(`http://localhost:8000/api/order/by/${localStorage.getItem('id')}`)
      .then((response) => {
        if (response.data.length >= 1) {
          setArticles(response.data);
          setNoItems("")
          // setPrice(0)
          console.table(response.data[0].order_id)
          console.log("PRIX => ", calcPrice(response.data));
        } else {
          setPrice("")
          setNoItems("Aucuns articles")
        }
        setOrderId(response.data[0].order_id);
        setResult((noItems !== "") ? noItems : price + " EUR");
        // alert('Article ajouté au panier avec succès !');
        calcQuantity(response.data[0].order_id);
      })
      .catch((error) => {
        console.error('Erreur aucun article dans le panier : ', error.response);
      });
    console.log("hello test "+orderId);
  }

  const calcPrice = (ArticlesToGetPrice) => {
    var price_calc = 0;
    // articles.map(article => {
    for (let count = 0; count < ArticlesToGetPrice.length; count++) {
      const element = ArticlesToGetPrice[count];
      price_calc += element.quantity * element.unit_price;
      // if (count + 1 === ArticlesToGetPrice.length && ArticlesToGetPrice.length > 0) {
      //   count = 1;
      // }
    }
    setPrice(price_calc);
    
    return price_calc;
    // count++;
    // })
  }

  const calcQuantity = (id) => {
    axios
      .get(`http://localhost:8000/api/count_item/${id}`)
      .then((response) => {
        // console.table(response.data['quantity'][0]['count']);
        setCountItem(response.data['quantity'][0]['count']);
      })
      .catch((error) => {
        console.error('Erreur veuillez vous connecter pour visualiser votre panier : ', error.response.data);
      });

      console.log("in quantity function "+countItem);
  }

  function handleDeleteFromBasket(id) {
    axios
      .delete(`http://localhost:8000/api/order_item/${id}`)
      .then((response) => {
        console.log(response.data);
        handleItems();
        if (articles.length >= 1) {
          setArticles([]);
          setPrice(0)
          // setResult(calcPrice());
          setResult(0);
        } else {
          setPrice("")
          setNoItems("Aucuns articles")
          setResult('Aucuns articles')
          setArticles([]);
          calcQuantity(orderId);
          handleMenuClose();
        }
        // setResult((noItems !== "") ? noItems : price +" EUR");
        // alert('Article supprimé du panier avec succès !');
      })
      .catch((error) => {
        console.error('Erreur dans la suppression de l\'article : ', error.response.data);
      });

      console.log("count item : "+countItem);

    // setOrderId();

  }

  const menuId = 'primary-search-account-menu';
  const menuIdBasket = 'primary-basket-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>

    </Menu>
  );

  var price_calc = 0;
  var count = 1;
  // var result = (noItems !== "") ? noItems : price+" EUR";

  const renderMenuBasket = (

    <Menu
      anchorEl={anchorElBasket}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuIdBasket}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpenBasket}
      onClose={handleMenuCloseBasket}
      sx={{ height: '300px' }}
    >
      {/* {console.table("order id "+articles[0].order_id)} */}

      {articles.map((article) => {
        return <MenuItem>{article.name}<span>&nbsp;&nbsp;</span><span style={{ backgroundColor: '#303134', width: '40px', color: 'white', borderRadius: '20px', textAlign: 'center' }}>{article.quantity}</span><Button onClick={() => handleDeleteFromBasket(article.asterix)&handleMenuCloseBasket()}>Delete</Button></MenuItem>
      })}
      {/* <Typography style={{ margin: 'auto', width: '100%', textAlign:'center' }}>{price}</Typography> */}
      {/* {console.log("prix "+price)} */}
      <Typography style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>{result}</Typography>

      <Button style={{ margin: 'auto', width: '100%' }}>Voir le panier</Button>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Panier</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={() => window.location.href = "/"}
            variant="h6"
            noWrap
            component="div"
            // style={-_-}
            //   /|\
            //   /-\
            //  /   \
            sx={{ fontSize: "12px", cursor: "pointer", fontFamily: "MGS", width: "9%", display: { xs: 'none', sm: 'block' } }}
          >HittaetTnamn</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e)}
              />

            </Search>
            {searchQuery.length !== 0 &&
              <SearchSuggestions />
            }
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuIdBasket}
              aria-label="basket of current user"
              aria-haspopup="true"
              onClick={handleBasketMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={(countItem==0)?0:countItem} color="error">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Dropdown />
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenuBasket}
    </Box>
  );
}
