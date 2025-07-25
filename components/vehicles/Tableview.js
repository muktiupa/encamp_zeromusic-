const Tableview = ({ alldata }) => {
  return (
    <>
      {alldata ? (
        <table id="ordertable">
          <thead>
            <tr>
              <th colSpan="3" className="shaded-row">
                Vehicle: <span style={{ color: 'red' }}>({alldata?.vehiclecategory ?? ''})</span>
              </th>
              <th className="shaded-row" style={{ color: 'red' }}>
                {alldata.vehicleType}{' '}
                {alldata.driveType === 'With Driver' ? (
                  <strong>(Driver Included)</strong>
                ) : alldata.driveType === 'Without Driver' ? (
                  <strong>(Driver Excluded)</strong>
                ) : null}
              </th>
            </tr>
            <tr>
              <th colSpan="3" className="shaded-row">Passengers:</th>
              <td className="shaded-row">{alldata.passengers}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan="3">Base Price</th>
              <td>₹{alldata.basePrice}</td>
            </tr>

            {alldata.discount > 0 && (
              <tr>
                <th colSpan="3">Discount</th>
                <td>- ₹{alldata.discount}</td>
              </tr>
            )}

            <tr>
              <th colSpan="3">{alldata.carboncesslabel || 'Carbon Fees'}</th>
              <td>₹{alldata.carboncess}</td>
            </tr>

            <tr>
              <th colSpan="3">{alldata.taxlabel || 'GST'}</th>
              <td>₹{alldata.gst}</td>
            </tr>

            <tr>
              <th colSpan="3"><strong>Total</strong></th>
              <td><strong>₹{alldata.totalPrice}</strong></td>
            </tr>
          </tbody>
        </table>
      
      ) : (
        <div>No billing data available</div>
      )}
    </>
  );
};

export default Tableview;
