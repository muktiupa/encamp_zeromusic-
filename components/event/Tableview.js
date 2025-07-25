const Tableview=({alldata})=>{

return (
<>
{alldata ? 
    <table id ="ordertable">
      <thead>
        <tr>
          <th colSpan="2" className="shaded-row">Stay:</th>
          <td className="shaded-row">₹{alldata.total} </td>
        </tr>
        <tr>
          <th colSpan="2" className="shaded-row">Activities:</th>
          <td className="shaded-row">₹{alldata.addonactivitytotal} </td>
        </tr>
        <tr>
          <th colSpan="2" className="shaded-row">Addons:</th>
          <td className="shaded-row">₹{alldata.addonaddontotal} </td>
        </tr>
      </thead>
      <tbody>
        {alldata.discountobj && <tr>
          <th colSpan="2">{`Discount ${alldata?.discountobj?.discountType ?? ''} @ ${alldata?.discountobj?.discountValue ?? ''}`}</th>
          <td>₹{ alldata?.discountobj?.discountAmount ?? 0}</td>
        </tr>}
         <tr>
          <th colSpan="2">Grand Total</th>
          <td><b>₹{alldata.grand}</b></td>
          
        </tr>
      </tbody>
    </table>
    :<div></div>
}
</>
  );

}
export default Tableview;