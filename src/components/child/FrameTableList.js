import React from "react";

function FrameTableList(props) {
  const master_sites = props.message;
  console.log("master sites : " + master_sites);

  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>NOJS</th>
          <th>Sites</th>

          {/* <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        {master_sites.map((data, index) => (
          <tr key={data.nojs}>
            <td>{index + 1}</td>
            <td>{data.nojs}</td>
            <td>{String(data.site)}</td>

            {/* <td>
                  <Link
                    to={`edit/${masterSites.id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteFrame(masterSites.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FrameTableList;
