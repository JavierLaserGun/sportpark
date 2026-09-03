export default function TermsPage() {
  return (
    <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand">// LEGAL</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-muted">Last Updated: 30 August 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <p className="text-sm text-muted">
            By creating an account, making a booking, purchasing a service, or using the facilities at SPORT_PARK, you agree to the following Terms & Conditions.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold">1. Bookings</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>All court bookings must be made through the official SPORT_PARK booking platform or other authorised booking channels.</li>
              <li>Bookings are subject to court availability and are only confirmed after successful payment or confirmation by SPORT_PARK.</li>
              <li>Customers are responsible for checking the correct date, time, court and duration before confirming a booking.</li>
              <li>SPORT_PARK reserves the right to close, block or change the availability of any court for maintenance, private events, tournaments, operational requirements or safety reasons.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold">2. Booking Time</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers may only use the court during their confirmed booking period.</li>
              <li>Players should arrive before their scheduled booking time.</li>
              <li>Bookings will end at the scheduled time regardless of late arrival. Additional playing time is subject to availability and additional charges.</li>
              <li>Customers must leave the court promptly after their booking to allow the next group to enter.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold">3. Cancellation, Rescheduling & Refunds</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Cancellation and rescheduling are subject to SPORT_PARK's prevailing cancellation policy.</li>
              <li>Bookings cancelled within the permitted cancellation period may be eligible for rescheduling, booking credit or refund, where applicable.</li>
              <li>Late cancellations and no-shows may not be eligible for a refund or rescheduling.</li>
              <li>SPORT_PARK may provide a refund, credit or alternative booking where a court becomes unavailable due to circumstances within SPORT_PARK's control.</li>
              <li>Refund processing times may depend on the payment provider.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold">4. Weather & Facility Conditions</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>As SPORT_PARK facilities may include indoor and/or sheltered areas, bookings will generally continue during normal weather conditions where the facility remains safe for use.</li>
              <li>SPORT_PARK reserves the right to suspend or cancel activities where weather, power failure, facility conditions or other circumstances create a safety or operational concern.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold">5. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers may be required to create an account before making a booking.</li>
              <li>Users are responsible for ensuring that information provided during registration is accurate and up to date.</li>
              <li>Each account is intended for use by the registered user and must not be used to abuse promotions, discounts, booking limits or other SPORT_PARK policies.</li>
              <li>SPORT_PARK reserves the right to suspend or restrict accounts reasonably suspected of fraudulent activity, misuse of the booking system or repeated violations of these Terms.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-bold">6. Student & Special Discounts</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Student, member, promotional or other special rates are available only to customers who meet the stated eligibility requirements.</li>
              <li>SPORT_PARK may require verification through an eligible email address, identification, membership record or other reasonable verification method.</li>
              <li>Discount eligibility is personal to the eligible customer unless otherwise stated and may not be transferred, sold or shared.</li>
              <li>SPORT_PARK reserves the right to remove discount eligibility where information provided is inaccurate or where the discount has been misused.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-bold">7. Reselling of Bookings</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Court bookings are intended for personal or authorised organisational use.</li>
              <li>Customers must not purchase court slots primarily for unauthorised resale, scalping or commercial redistribution.</li>
              <li>SPORT_PARK may cancel bookings or restrict accounts where there is reasonable evidence of unauthorised resale or systematic abuse of booking availability.</li>
              <li>Approved coaches, event organisers or commercial users may be subject to separate arrangements.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-lg font-bold">8. Payments</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>All prices are displayed in Brunei Dollars (BND) unless otherwise stated.</li>
              <li>Customers are responsible for ensuring payment details are correct before completing a transaction.</li>
              <li>Prices, promotions and discounts may be changed from time to time. Changes will not normally affect previously confirmed and fully paid bookings unless required by law or agreed with the customer.</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-lg font-bold">9. Player Conduct</h2>
            <p className="text-sm text-foreground mt-2">
              All customers and visitors must behave respectfully towards other players, staff and visitors. SPORT_PARK may refuse entry or require a person to leave the premises for behaviour including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Fighting, threatening or abusive behaviour</li>
              <li>Harassment of staff or other customers</li>
              <li>Deliberate damage to property</li>
              <li>Dangerous or reckless conduct</li>
              <li>Smoking or vaping in prohibited areas</li>
              <li>Unauthorised commercial activity</li>
              <li>Repeated failure to follow facility rules or staff safety instructions</li>
            </ul>
            <p className="text-sm text-foreground mt-2">Serious or repeated violations may result in suspension of booking privileges.</p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-lg font-bold">10. Safety & Personal Responsibility</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers participate in sporting activities at their own risk, subject to applicable law.</li>
              <li>Players are responsible for determining whether they are physically capable of participating in their chosen activity and should use appropriate footwear, equipment and protective equipment where necessary.</li>
              <li>Children and minors must be appropriately supervised by a parent, guardian, coach or responsible adult where required.</li>
              <li>Customers must immediately report damaged equipment, unsafe court conditions or hazards to SPORT_PARK staff.</li>
            </ul>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-lg font-bold">11. Injury & Emergency</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>SPORT_PARK will take reasonable steps to maintain its facilities in a safe condition.</li>
              <li>However, sporting activities naturally involve risks including falls, collisions and injuries.</li>
              <li>To the extent permitted by applicable law, SPORT_PARK is not responsible for injuries resulting from the inherent risks of sporting activities, misuse of facilities, failure to follow instructions or the actions of other participants.</li>
              <li>Nothing in these Terms excludes liability that cannot legally be excluded.</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-lg font-bold">12. Damage to Property</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers may be held responsible for damage to SPORT_PARK property caused intentionally, recklessly or through misuse.</li>
              <li>SPORT_PARK reserves the right to seek reasonable repair or replacement costs where appropriate.</li>
            </ul>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-lg font-bold">13. Personal Belongings</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers are responsible for their own personal belongings.</li>
              <li>SPORT_PARK is not responsible for lost, stolen or damaged personal property except where liability cannot legally be excluded.</li>
              <li>Any lost property handed to SPORT_PARK may be kept for a reasonable period before being disposed of, donated or otherwise handled in accordance with SPORT_PARK policy.</li>
            </ul>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-lg font-bold">14. Photos, CCTV & Security</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>CCTV may operate within SPORT_PARK for security, safety, incident investigation and property protection purposes.</li>
              <li>Where account photographs or selfies are collected for identity or account verification, they will be handled in accordance with SPORT_PARK's Privacy Policy.</li>
              <li>SPORT_PARK will separately obtain appropriate permission where identifiable customer photographs or videos are intended primarily for advertising or promotional purposes, unless otherwise permitted by law.</li>
            </ul>
          </div>

          {/* Section 15 */}
          <div>
            <h2 className="text-lg font-bold">15. Personal Data & Privacy</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>SPORT_PARK may collect information necessary to operate its services, including account information, contact details, booking history, payment-related information and eligibility information.</li>
              <li>Certain optional demographic information may also be collected for customer analytics where appropriate.</li>
              <li>Personal information will be handled in accordance with SPORT_PARK's Privacy Policy and applicable requirements.</li>
              <li>Customers should review the Privacy Policy to understand what information is collected, why it is collected, how long it may be retained and the choices available to them.</li>
            </ul>
          </div>

          {/* Section 16 */}
          <div>
            <h2 className="text-lg font-bold">16. Website & Booking System</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>SPORT_PARK aims to keep its website and booking platform available and accurate but does not guarantee uninterrupted access.</li>
              <li>Temporary interruptions may occur because of maintenance, internet outages, payment-provider issues, technical failures or circumstances outside SPORT_PARK's reasonable control.</li>
              <li>Where an obvious system error results in an invalid booking, incorrect availability or incorrect pricing, SPORT_PARK may contact the customer to correct the issue and, where appropriate, offer an alternative booking or refund.</li>
            </ul>
          </div>

          {/* Section 17 */}
          <div>
            <h2 className="text-lg font-bold">17. Events, Coaching & Commercial Activities</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Private coaching, tournaments, organised events, commercial activities, photography productions or other business activities may require prior approval from SPORT_PARK.</li>
              <li>SPORT_PARK may apply separate rates, conditions or facility requirements to such activities.</li>
            </ul>
          </div>

          {/* Section 18 */}
          <div>
            <h2 className="text-lg font-bold">18. Food, Drinks & Cleanliness</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>Customers must keep courts and common areas clean.</li>
              <li>Food and drinks may only be consumed in designated areas where applicable.</li>
              <li>Customers should dispose of rubbish appropriately and avoid bringing items onto the playing surface that may cause damage, staining or safety hazards.</li>
            </ul>
          </div>

          {/* Section 19 */}
          <div>
            <h2 className="text-lg font-bold">19. Right to Refuse Entry</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>SPORT_PARK reserves the right to refuse entry, cancel a booking or require a customer to leave where reasonably necessary for safety, security, serious misconduct, fraud, facility protection or enforcement of these Terms.</li>
              <li>Where SPORT_PARK cancels a valid booking for operational reasons unrelated to customer misconduct, an appropriate refund, credit or alternative booking may be offered.</li>
            </ul>
          </div>

          {/* Section 20 */}
          <div>
            <h2 className="text-lg font-bold">20. Changes to These Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
              <li>SPORT_PARK may update these Terms & Conditions from time to time.</li>
              <li>The latest version will be published on the SPORT_PARK website together with its effective or updated date.</li>
              <li>The Terms applicable to a booking will generally be those in effect when the booking is made, except where changes are required by law.</li>
            </ul>
          </div>

          {/* Section 21 */}
          <div>
            <h2 className="text-lg font-bold">21. Governing Law</h2>
            <p className="text-sm text-foreground mt-2">
              These Terms & Conditions are governed by the laws of Brunei Darussalam. Any dispute arising from the use of SPORT_PARK's services or facilities will be handled in accordance with the applicable laws and jurisdiction of Brunei Darussalam.
            </p>
          </div>

          {/* Section 22 */}
          <div>
            <h2 className="text-lg font-bold">22. Contact</h2>
            <p className="text-sm text-foreground mt-2">
              Questions regarding bookings, payments, refunds, privacy or these Terms & Conditions may be directed to SPORT_PARK through the contact details provided on the official website.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6 mt-8">
            <p className="text-xs text-muted">
              By proceeding with a booking, you confirm that you have read and agree to SPORT_PARK's Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
