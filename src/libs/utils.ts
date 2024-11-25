import {
  AppointmentStatus,
  ListingType,
  RequestStatus,
  RequestType,
} from "@/orval/type.schemas";

function cleanString(inputString: string) {
  // Convert the input string to lowercase
  let lowerCaseString = inputString.toLowerCase().trim();

  // Remove special characters using regex
  let cleanedString = lowerCaseString.replace(/[^a-z0-9\s]/g, "");

  return cleanedString;
}

function validatePassword(password: string) {
  const minLength = /.{8,}/; // At least 8 characters
  const hasNumber = /[0-9]/; // At least one number
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
  const hasUpperCase = /[A-Z]/; // At least one uppercase letter

  return (
    minLength.test(password) &&
    hasNumber.test(password) &&
    hasSpecialChar.test(password) &&
    hasUpperCase.test(password)
  );
}

function getListingTypeColor(value: ListingType | undefined) {
  if (value == ListingType.Default) {
    return "transparent";
  } else if (value == ListingType.Sell) {
    return "#019CCF";
  } else if (value == ListingType.Rent) {
    return "#5725CC";
  } else {
    return "transparent";
  }
}

function getRequestTypeColor(value: RequestType | undefined) {
  if (value == RequestType.Default) {
    return "transparent";
  } else if (value == RequestType.Buy) {
    return "#019CCF";
  } else if (value == RequestType.Sell) {
    return "#28B6B4";
  } else if (value == RequestType.Rent) {
    return "#5725CC";
  } else if (value == RequestType.RentOut) {
    return "#D839B3";
  } else if (value == RequestType.Insurance) {
    return "#003366";
  } else if (value == RequestType.Enquiry) {
    return "#72C11D";
  } else {
    return "transparent";
  }
}

function getRequestStatusColor(value: RequestStatus | undefined) {
  if (value == RequestStatus.Default) {
    return "transparent";
  } else if (value == RequestStatus.Completed) {
    return "#2BB10A";
  } else if (value == RequestStatus.Incomplete) {
    return "#E72C2C";
  } else {
    return "#F9D800";
  }
}

function getAppointmentStatusColor(value: AppointmentStatus | undefined) {
  if (
    value == AppointmentStatus.Completed ||
    value == AppointmentStatus.Scheduled
  ) {
    return "#2BB10A";
  } else {
    return "#E72C2C";
  }
}

function getRequestDateText(value: RequestStatus | undefined) {
  if (value == RequestStatus.Default) {
    return "";
  } else if (value == RequestStatus.Pending) {
    return "Created at";
  } else if (value == RequestStatus.Completed) {
    return "Completed at";
  } else {
    return "Updated at";
  }
}

export {
  cleanString,
  validatePassword,
  getListingTypeColor,
  getRequestTypeColor,
  getRequestStatusColor,
  getAppointmentStatusColor,
  getRequestDateText,
};
