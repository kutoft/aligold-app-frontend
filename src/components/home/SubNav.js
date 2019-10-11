import React, { useRef } from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles({
  subNav: {
    display: 'flex',
    height: '63px',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '30px 30px 0 0',
    overflow: 'hidden',
    '& .navItem': {
      position: 'relative',
      width: '50%',
      height: '50px',
      lineHeight: '33px',
      padding: '0.5rem 1rem',
      textAlign: 'center',
      fontSize: Variables.fontSize.medium,
      backgroundColor: Variables.colors.white,
      color: Variables.colors.dark,
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '2px',
        bottom: '0',
        left: '0',
        backgroundColor: Variables.colors.medium,
      },
      '&.active': {
        backgroundColor: Variables.colors.light,
        '&:after': {
          backgroundColor: Variables.colors.primary,
        }
      },
      '&:first-child': {
        paddingRight: '35px',
      },
      '&:last-child': {
        paddingLeft: '35px',
      },
      '&.hide': {
        display: 'none',
      },
    },
    '& .search': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: '1',
      top: '25px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '75px',
      height: '75px',
      border: `2px solid ${Variables.colors.medium}`,
      borderRadius: '50%',
      backgroundColor: Variables.colors.white,
    },
  },
  search: {
    '& input': {
      position: 'absolute',
      top: '-100%',
    },
    '& .close': {
      display: 'none',
    },
    '&.active': {
      width: '100%',
      position: 'relative',
      '& input': {
        display: 'block',
        position: 'relative',
        top: '0',
        width: '100%',
        height: '50px',
        padding: '10px 20px',
        border: `0px solid ${Variables.colors.medium}`,
        borderBottomWidth: '2px',
      },
      '& .close': {
        display: 'flex',
        position: 'absolute',
        top: '0',
        right: '0',
        width: '50px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '& .search': {
        display: 'none',
      }
    }
  }
});

export default function SubNav(props) {
  const classes = useStyles();
  const inputEl = useRef();

  return (
    <div className={classes.subNav}>
      <div className={`navItem ${props.subNav === 'stream' ? 'active' : ''} ${props.searchOpen ? 'hide' : '' }`} onClick={(nav) => props.setSubNav('stream')}>
        Stream
      </div>
      <div className={`${classes.search} ${props.searchOpen ? 'active' : '' }`} >
        <input ref={inputEl} id="el" type='text' onChange={(e) => props.setSearchQuery(e.target.value)} />
        <div className="close" onClick={() => {props.setSearchOpen(!props.searchOpen); props.setSearchQuery(''); inputEl.current.value = '';}}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
        <div className="search" onClick={() => {props.setSearchOpen(!props.searchOpen); inputEl.current.focus();}} >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <div className={`navItem ${props.subNav === 'contacts' ? 'active' : ''} ${props.searchOpen ? 'hide' : '' }`} onClick={(nav) => props.setSubNav('contacts')}>
        Contacts
      </div>

    </div>
  )
}
