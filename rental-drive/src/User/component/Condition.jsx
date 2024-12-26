import { Grid, Typography } from "@mui/material";

const Condition=()=>{

    return(
        <div class="container">
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={12} >
                    <Typography variant="h2" sx={{color:"#103b0e", fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",textAlign:"center"}}>
                        CAR RENTAL CONDITIONS
                    </Typography>
                    
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600", marginBottom:"20px"}}>
                            1. The driver : 
                        </Typography>
                        <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            To rent, the designated driver on the contract must be over 21 years old. 
                            They must also have held a valid driving license for at least one year. 
                            This must be justified by original documents. If a second driver is requested, 
                            they must be present at the time of departure and present the original 
                            of their driving license as well as an identity card (for Moroccan residents) or a passport (for foreigners). 
                            Only drivers identified on the rental contract are authorized to drive the rented vehicle.
                        </Typography>
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            2. Duration : 
                        </Typography>
                        <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            The rental is granted for the duration specified in the contract unless an extension is
                            conventionally agreed upon by the lessor. If the vehicle is not returned at the agreed-upon time, 
                            the lessor reserves the right to reclaim the vehicle wherever it may be, at the renter's expense.
                        </Typography>
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            3. Delivery : 
                        </Typography>
                        <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            RentDrive gives you the choice of where you want to pick up or return the vehicle 
                            (Hassan I Airport of Laâyoune, Laâyoune Agency: centre d'affaires Ahain boulevard Samara, 70000, Morocco) subject to prior agreement.
                        </Typography>
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            4. Fuel : 
                        </Typography>
                        <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                        The fuel is the responsibility of the renter. The car will be delivered with a certain fuel 
                        level and must be returned with the same level. Fuel left in the tank will not be refunded.
                        </Typography>
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            5. Insurance : 
                        </Typography>

                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>The vehicles are fully insured (tires are not included). However, for any damage other than vehicle theft, fire, glass breakage, 
                            civil liability, and transported persons (PAI), a non-redeemable deductible remains the driver's responsibility if they are 
                            partially or entirely at fault. For any accident, vehicle damage is only covered upon the production of an accident report within 24 hours.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>Using the vehicles on unpaved roads (tracks) is prohibited except for 4x4s.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>The driver is solely responsible for traffic violations and fines.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>In case of mechanical breakdown not caused by the client, a replacement car is provided by our agency.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>In case of an at-fault accident, the replacement car will be charged to the client along with delivery fees.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>In case of an at-fault accident, the transport of the damaged car by tow truck is at the client's expense.</Typography></p>
                            <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"10px"}}>It is strictly forbidden to drive our vehicles on the coast, by the sea, and in rivers. In such cases and in the event of a breakdown and/or 
                            submersion or other damage caused to the vehicle, the renter will be obliged to pay the full repair cost without any limit, and the amount 
                            could reach the purchase price of the vehicle. In these cases, the deductible will not be applicable.</Typography></p>
                        
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            6. Jurisdiction : 
                        </Typography>
                        <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            By express agreement, the court in whose jurisdiction the lessor's registered office is located shall have sole jurisdiction over any disputes 
                            relating to this contract. However, the lessor may waive the benefit of this jurisdiction clause and bring proceedings before any competent court.
                        </Typography>
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            7. Refund : 
                        </Typography>

                        <p> <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>The rental amount is payable in advance for the entire rental period and will not be refunded in case of a reduction in the rental duration.</Typography></p>
                        <p><Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>The deposit, however, implies a firm commitment from both parties. The client can cancel their reservation, and the deposit paid will not be refundable but will be credited towards your next reservation.</Typography></p>
                        
                    </div>
                    <div style={{margin:"20px 0 25px 0"}}>
                        <Typography variant="h6" sx={{backgroundColor:"#fdf9f3",padding:"5px",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600",marginBottom:"20px"}}>
                            8. Required Documents : 
                        </Typography>
                        <div style={{marginBottom:"20px", marginLeft:"20px"}}>
                            <Typography variant="body1" sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"500",marginBottom:"15px"}}>
                                * Driving License : 
                            </Typography>
                            <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                                A driving license of at least 2 years with no major violations.
                            </Typography>
                        </div>
                        <div style={{marginBottom:"20px", marginLeft:"20px"}}>
                            <Typography variant="body1" sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"500",marginBottom:"15px"}}>
                                * Identification : 
                            </Typography>
                            <Typography variant="subtitle1" sx={{textAlign:"justify",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                                A valid identification (passport or ID card).
                                If your ID does not include or match your current address, you will also need to present a separate proof of address.
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Condition;