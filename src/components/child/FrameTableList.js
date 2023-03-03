import React from "react";

function FrameTableList(props) {
  const master_frame = props.message;
  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          {/* <th>Kode Site</th> */}
          <th>Serial Frame</th>
          {/* <th>Ip</th> */}
          <th>Status Test</th>
          <th>Result Test</th>
          <th>Test Time</th>
          {/* <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        {master_frame.map((masterFrame, index) => (
          <tr key={masterFrame.id}>
            <td>{index + 1}</td>
            {/* <td>{masterFrame.kd_site}</td> */}
            <td>{masterFrame.frame_sn}</td>
            {/* <td>{masterFrame.ip_adrs}</td> */}
            <td>{String(masterFrame.status_test)}</td>
            <td>{String(masterFrame.result)}</td>
            <td>{masterFrame.createdAt}</td>
            {/* <td>
                  <Link
                    to={`edit/${masterFrame.id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteFrame(masterFrame.id)}
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
