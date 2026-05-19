# Full App Architecture

## 1. Technical Stack
*   **Frontend**: React (v19), Material UI (v6), React Router (v7).
*   **GIS Integration**: React-Leaflet for coordinate mapping and neighborhood analysis.
*   **Backend**: Node.js with Express.
*   **Database**: PostgreSQL (Relational integrity for Users/Deals/Documents).
*   **Real-time**: Socket.io for Secure Deal Initiation Rooms.
*   **Cloud Storage**: Cloudinary (Optimized images) + AWS S3 (Secure PDF storage).

## 2. Database Schema (Entities)
### User
*   ID, Email, Password, Role (Buyer, Agent, Admin)
*   IsVerified (Boolean)
*   TrustScore (Int)

### AgentProfile (Extends User)
*   AgisID (String)
*   LicenseNumber
*   Specialization
*   CompletedDealsCount

### PropertyListing
*   ID, AgentID, Title, Price, Location
*   Coordinates (Lat/Lng)
*   VerificationStatus (Enum: Pending, Verified, Rejected)
*   DocumentProofs (JSON/Array of links - Hidden from public)

### VerificationJob
*   ID, RequesterID, AssignedAgentID
*   Status (In Progress, Completed)
*   Fee, CommissionAmount

## 3. Workflow Architecture
1.  **Deal Initiation**: Buyer finds listing -> Requests Verification or Chat.
2.  **Verification Logic**: System matches request to Agent -> Agent uploads check results -> Buyer pays fee.
3.  **Initiation Room**: Once verified, Buyer/Seller/Agent enter a secure room to exchange draft agreements.

## 4. Security & Privacy
*   **Blurred Documents**: Original documents never shown to the public; only "Verified" checkmarks.
*   **Tokenized Access**: Verification reports are only accessible to the person who paid for them.
*   **Anonymity**: Contact details are hidden until both parties "Unlock" the deal in the room.
