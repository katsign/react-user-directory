export default function Row({
    firstName,
    lastName,
    image,
    phone,
    email,
    location
  }) {
    return (
      <>
        <tr className='mb-5'>
          <td>
            <img alt={firstName} src={image} />
          </td>
          <td>
            <strong>{firstName}</strong>
          </td>
          <td>
            <strong>{lastName}</strong>
          </td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>{location}</td>
        </tr>
      </>
    );
  }