import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [text, setText] = useState('');
  const [check, setCheck] = useState(false);

  const SearchArray = (profile) => {
    var len = profile.skills.length, str = text.toString().toLowerCase();
    var arr = str.split(" ");
    var index = arr.indexOf('development');
    if (index > -1) {
      arr.splice(index, 1);
    }

    index = arr.indexOf('developer');
    if (index > -1) {
      arr.splice(index, 1);
    }

    for (var i = 0; i < len; i++) {
      for (var j = 0; j < arr.length; j++) {
        var count = profile.skills[i].toLowerCase().includes(arr[j]);
        if (count) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <form
              onSubmit={e => {
                e.preventDefault();
                setCheck(true);
              }}
            >
              <div className='wrap'>
                <div className='search'>
                  <input
                    type='text'
                    className='searchTerm'
                    placeholder='Search developers by skill..'
                    onChange={e => {
                      setText(e.target.value.toLowerCase());
                      setCheck(true);
                    }
                    }
                  />
                  <button type='submit' className='searchButton'>
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>
            </form>
            <h1 className='large text-primary'>Developers</h1>

            <p className='lead'>
              <i class="fas fa-users"></i> Browse and connect with
                  developers
          </p>
            <div className='profiles'>
              {!check ? (
                profiles.length > 0 ? (
                  profiles.map(profile => {
                    return <ProfileItem key={profile._id} profile={profile} />;
                  })
                ) : (
                    <h4>No profiles found...</h4>
                  )
              ) : (
                  text.trim().length > 0 ? (
                    profiles.length > 0 ? (
                      profiles
                        .filter(profile => { return SearchArray(profile) })
                        .map(profile => {
                          return <ProfileItem key={profile._id} profile={profile} />;
                        })
                    ) : (
                        <h4>No profiles found...</h4>
                      )
                  ) : (
                      profiles.length > 0 ? (
                        profiles.map(profile => {
                          return <ProfileItem key={profile._id} profile={profile} />;
                        })
                      ) : (
                          <h4>No profiles found...</h4>
                        )
                    )
                )}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
