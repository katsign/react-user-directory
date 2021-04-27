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
        <tr>
          <td>
            <img alt={firstName} src={image} />
          </td>
          <td>
            <strong>{firstName}</strong>
          </td>
          <td>
            <strong>{lastName}</strong>
          </td>
          <td><small>{phone}</small></td>
          <td><small>{email}</small></td>
          <td>{location}</td>
        </tr>
      </>
    );
  }