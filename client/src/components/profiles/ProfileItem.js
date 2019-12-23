import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <tr>
        <td className='profile-column'>
          <ul>
            {skills.slice(0, 8).map((skill, index) => (
              <li key={index} className='text-primary'>
                <i className='fas fa-check' /> {skill}
              </li>
            ))}
          </ul>
        </td>

        <td className='profile-column'>
          <ul>
            {skills.slice(9, 16).map((skill, index) => (
              <li key={index} className='text-primary'>
                <i className='fas fa-check' /> {skill}
              </li>
            ))}
          </ul>
        </td>
      </tr>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
