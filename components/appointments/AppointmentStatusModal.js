// import React, { useState } from "react";

// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import { useDispatch } from "react-redux";


// import { updateAppointmentStatus } from "../../src/redux/appointmentSlice";

// import styles from "./AppointmentStatusModal.css";

// const STATUS = [
//   "pending",
//   "confirmed",
//   "in progress",
//   "completed",
//   "cancelled",
//   "no show",
// ];

// const AppointmentStatusModal = ({
//   visible,
//   onClose,
//   appointmentId,
//   currentStatus,
// }) => {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   const [selectedStatus, setSelectedStatus] = useState(currentStatus);

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       await dispatch(
//         updateAppointmentStatus({
//           id: appointmentId,

//           status: selectedStatus,
//         }),
//       ).unwrap();

//       onClose();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal transparent visible={visible} animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Update Appointment Status</Text>

//           {STATUS.map((status) => (
//             <TouchableOpacity
//               key={status}
//               style={[
//                 styles.option,
//                 selectedStatus === status && styles.selectedOption,
//               ]}
//               onPress={() => setSelectedStatus(status)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,

//                   selectedStatus === status && styles.selectedText,
//                 ]}
//               >
//                 {status}
//               </Text>

//               {selectedStatus === status && (
//                 <MaterialCommunityIcons
//                   name="check-circle"
//                   size={22}
//                   color="#2563EB"
//                 />
//               )}
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={handleUpdate}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.saveText}>Update Status</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity onPress={onClose}>
//             <Text style={styles.cancel}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default AppointmentStatusModal;

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import { updateAppointmentStatus } from "../../src/redux/appointmentSlice";
import styles from "./AppointmentStatusModal.css";

// Must match your Mongoose schema enum exactly
// const STATUS = [
//   "Pending",
//   "Accepted",
//   "Rejected",
//   "Completed",
//   "Cancelled",
//   "No Show",
// ];
const STATUS = [
  "All",
  "Pending",
  "Accepted",
  "Rejected",
  "No Show",
  "Completed",
  "Cancelled",
];

const AppointmentStatusModal = ({
  visible,
  onClose,
  appointmentId,
  currentStatus,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Sync internal state if currentStatus prop updates
  useEffect(() => {
    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [currentStatus]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await dispatch(
        updateAppointmentStatus({
          id: appointmentId,
          status: selectedStatus,
        }),
      ).unwrap();

      onClose();
    } catch (error) {
      console.log("Error updating appointment status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Appointment Status</Text>

          {STATUS.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.option,
                selectedStatus === status && styles.selectedOption,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedStatus === status && styles.selectedText,
                ]}
              >
                {status}
              </Text>

              {selectedStatus === status && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color="#2563EB"
                />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Update Status</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentStatusModal;
