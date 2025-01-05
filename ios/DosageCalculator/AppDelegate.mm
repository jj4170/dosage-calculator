#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <TrustKit/TrustKit.h>
#import <TrustKit/TSKPinningValidator.h>
#import <TrustKit/TSKPinningValidatorCallback.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"DosageCalculator";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  void (^loggerBlock)(NSString *) = ^void(NSString *message)
  {
    NSLog(@"TrustKit log: %@", message);
  };
  [TrustKit setLoggerBlock:loggerBlock];

  NSDictionary *trustKitConfig =
  @{
    // Swizzling because we can't access the NSURLSession instance used in React Native's fetch method
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains: @{
        @"eyeplanet.info" : @{
            kTSKIncludeSubdomains: @YES, // Pin all subdomains
            kTSKEnforcePinning: @YES, // Block connections if pinning validation failed
            kTSKDisableDefaultReportUri: @YES,
            kTSKPublicKeyHashes : @[
              @"18tkPyr2nckv4fgo0dhAkaUtJ2hu2831xlO2SKhq8dg=",
              @"++MBgDH5WGvL9Bcn5Be30cRcL0f5O+NyoXuWtQdX1aI=", // Fake backup key but we need to provide 2 pins
            ],
        },
    }};
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
  [TrustKit sharedInstance].pinningValidatorCallback = ^(TSKPinningValidatorResult *result, NSString *notedHostname, TKSDomainPinningPolicy *policy) {
    if (result.finalTrustDecision == TSKTrustEvaluationFailedNoMatchingPin) {
      NSLog(@"TrustKit certificate matching failed");
      // Add more logging here. i.e. Sentry, BugSnag etc
    }
  };

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end