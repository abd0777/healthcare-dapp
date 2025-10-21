// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AppointmentPayment {
    address payable public admin;
    uint256 public fee = 0.00018 ether;

    struct Appointment {
        address patient;
        string doctorLicense;
        string date;
        string time;
        string note;
    }

    mapping(bytes32 => Appointment) public appointments;

    event AppointmentBooked(bytes32 indexed appointmentId, address indexed patient);

    constructor(address payable _admin) {
        admin = _admin;
    }

    function payAndBook(
        string memory doctorLicense,
        string memory date,
        string memory time,
        string memory note,
        bytes32 appointmentId
    ) external payable {
        require(msg.value >= fee, "Insufficient ETH sent");
        require(appointments[appointmentId].patient == address(0), "Appointment exists");

        appointments[appointmentId] = Appointment({
            patient: msg.sender,
            doctorLicense: doctorLicense,
            date: date,
            time: time,
            note: note
        });

        emit AppointmentBooked(appointmentId, msg.sender);
        (bool success, ) = admin.call{value: msg.value}("");
        require(success, "Transfer to admin failed");
    }

    function withdraw() external {
        require(msg.sender == admin, "Only admin can withdraw");
        admin.transfer(address(this).balance);
    }

    function getAppointment(bytes32 appointmentId) external view returns (Appointment memory) {
        return appointments[appointmentId];
    }
}
