import adminapi from "../api/adminapi";

const DataSubmittedtoapi = async (data) => {
  try {
    const { email, mobile } = data;

    // Validate that at least one of email or mobile is provided
    if (!email && !mobile) {
      return { success: false, message: "Either email or mobile is required" };
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email format" };
    }

    // Validate mobile format if provided (assuming 10-digit number for example)
    if (mobile && !/^\d{10}$/.test(mobile)) {
      return { success: false, message: "Invalid mobile number format" };
    }

    const localresponse = await adminapi.post("/addinquiry", JSON.stringify(data));
    const { _id } = localresponse.data.inquiry;

    if (_id && _id !== "") {
      return { success: true, message: _id };
    } else {
      return { success: false, message: "Data not saved" };
    }
  } catch (e) {
    return { success: false, message: e.message || "An error occurred" };
  }
};

export { DataSubmittedtoapi };
